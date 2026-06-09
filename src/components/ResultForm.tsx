 
 "use client";
 import { zodResolver } from '@hookform/resolvers/zod';
 import { string, z } from 'zod'; // or 'zod/v4'
 import {  toast } from 'react-toastify';
 import InputField from './InputField';
 import Image from "next/image"
 import Select from 'react-select';
 import { Controller, FieldError } from 'react-hook-form';
 import {resultSchema,ResultSchema } from '@/lib/formValidationSchema';
 import { createResult, updateResult,deleteResult } from '@/lib/actions';
 import { useForm } from 'react-hook-form';
 import { useFormState } from "react-dom";
 import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
 import { useRouter } from 'next/navigation';
 
 const ResultForm = ({setOpen,type,data,relatedData}: {setOpen:Dispatch<SetStateAction<boolean>>,type:"edit" | "create" ; data?:any,relatedData:any;}
 
 ) => {
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
     const actionToTake = type === "create" ? createResult:updateResult;
     const {
         register,
         handleSubmit,
         control, 
         formState: { errors ,isSubmitting},
       } = useForm<ResultSchema>({
       
         defaultValues: data,
       });
         const {exams,subjects,students}=relatedData
      const [state, formAction] = useFormState(actionToTake, { success: false, error: false });
         const router=useRouter();
 
         const onSubmit = handleSubmit(
          (data) => {
            console.log("✅ FRONTEND PASSED! Sending this to server:", data);
            formAction(data);
          },
          (errors) => {
            console.log("❌ FRONTEND BLOCKED! Zod hates this field:", errors);
          }
        );
       useEffect(()=>{
         if(state.success){
                 toast(`Result has been ${type==="create"?"created":"updated"}`);
                 router.refresh();
                 setOpen(false)
         }
       },[state])
   return (
     <form className='flex flex-col gap-2'  onSubmit={onSubmit}  >
       <h1 className='text font-semibold'>{type==="create"?"Create a new Result":"Update the Result"}</h1>
 
       {data && <input type="hidden" {...register("id")} defaultValue={data.id} />}
       <div className=' w-full flex flex-wrap gap-6  '> 
 
      <InputField label="score" name="score" defaultValue={data?.score}  register={register} error={errors.score}  />
      
      <div className='flex flex-col gap-1 flex-1'>
  <label className='text-sm text-gray-400'>Subject</label>

  
  <select 
    {...register("subjectId")} 
    className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full cursor-pointer outline-none focus:ring-blue-400'
    defaultValue={data?.subjectId || ""}
  >
    <option value="" disabled>Select a subject...</option>
    
    
    {subjects.map((subject: { id: string, name: string }) => (
      <option key={subject.id} value={subject.id}>
        {subject.name}
      </option>
    ))}
  </select>

  
  {errors.subjectId?.message && (
    <p className='text-sm text-red-500'>{errors.subjectId?.message.toString()}</p>
  )}
</div>
      

<div className='flex flex-col gap-1 flex-1'>
  <label className='text-sm text-gray-400'>Exam</label>

  
  <select 
    {...register("examId")} 
    className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full cursor-pointer outline-none focus:ring-blue-400'
    defaultValue={data?.examId || ""}
  >
    <option value="" disabled>Select an exam...</option>
    
    
    {exams.map((exam: { id: string, title: string }) => (
      <option key={exam.id} value={exam.id}>
        {exam.title}
      </option>
    ))}
  </select>

  
  {errors.examId?.message && (
    <p className='text-sm text-red-500'>{errors.examId?.message.toString()}</p>
  )}
</div>
      

<div className='flex flex-col gap-1 flex-1 min-w-[200px]'>
          <label className='text-sm text-gray-400'>Student</label>
          <Controller
            name="studentId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={students.map((s: any) => ({ value: s.id, label: s.username }))}
                value={students.map((s: any) => ({ value: s.id, label: s.username })).find((opt: any) => opt.value === field.value) || null}
                onChange={(option: any) => field.onChange(option ? option.value : "")}
                isSearchable={true}
                isClearable={true}
                placeholder="Select a student..."
                className="text-sm"
              />
            )}
          />
          {errors.studentId?.message && (
            <p className='text-sm text-red-500'>{errors.studentId?.message.toString()}</p>
          )}
        </div>
  
 
      
       </div>
       
 
 
         
   
     
             {state.error && <span className='text-red-500 text-sm'>{typeof state.error==="string"?state.error:"Something went wrong. Please try again!" }</span>}
 
        
 
 
       <div  className='flex  my-4 w-full justify-center'>
       <button disabled={isSubmitting} className='bg-blue-400 w-[100px] px-4 py-2 rounded-xl text-white'>{type==="create"?"Create":"Update"}</button>
       </div>
     </form>
   )
 }
 
 export default ResultForm
 