 
 "use client";
 import { zodResolver } from '@hookform/resolvers/zod';
 import { string, z } from 'zod'; // or 'zod/v4'
 import {  toast } from 'react-toastify';
 import InputField from './InputField';
 import Image from "next/image"
 import Select from 'react-select';
 import { Controller, FieldError } from 'react-hook-form';
 import {examSchema, resultSchema,ResultSchema, type ExamSchema } from '@/lib/formValidationSchema';
 import { createExam, updateExam,deleteExam } from '@/lib/actions';
 import { useForm } from 'react-hook-form';
 import { useFormState } from "react-dom";
 import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
 import { useRouter } from 'next/navigation';
 
 const ExamForm = ({setOpen,type,data,relatedData}: {setOpen:Dispatch<SetStateAction<boolean>>,type:"edit" | "create" ; data?:any,relatedData:any;}
 
 ) => {
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
     const actionToTake = type === "create" ? createExam:updateExam;
     const {
         register,
         handleSubmit,
         control, 
         formState: { errors ,isSubmitting},
       } = useForm<ExamSchema>({
         resolver: zodResolver(examSchema)  ,
         defaultValues: data,
       });
         const {lessons}=relatedData
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
                 toast(`Exam has been ${type==="create"?"created":"updated"}`);
                 router.refresh();
                 setOpen(false)
         }
       },[state])
   return (
     <form className='flex flex-col gap-2'  onSubmit={onSubmit}  >
       <h1 className='text font-semibold'>{type==="create"?"Create a new Exam":"Update the Exam"}</h1>
 
       {data && <input type="hidden" {...register("id")} defaultValue={data.id} />}
       <div className=' w-full flex flex-wrap gap-6  '> 
 
      <InputField label="title" name="title" defaultValue={data?.title}  register={register} error={errors.title}  />
      
 

  
  

  
   
     
  <div className='flex flex-col gap-1 flex-1'>
        <label className='text-sm text-gray-400'  >Day</label>
     <select  {...register("day")} className='ring-[1.5px] ring-gray-300  px-2 py-2 rounded-md text-sm' defaultValue={data?.day || "demo"}>
     <option disabled value="demo">Select a day</option>
        <option value="SUNDAY">Sunday </option>
       
        <option value="MONDAY">Monday </option>
        <option value="TUESDAY">Tuesday </option>
        <option value="WEDNESDAY">Wednesday </option>
        <option value="THURSDAY">Thursday </option>
        <option value="FRIDAY">Friday </option>
        <option value="SATDAY">Satday </option>
     </select>
      {errors.day?.message && <p className='text-sm text-red-500'>{errors.day?.message.toString()}</p>}
      </div>
 
<InputField
          label="Start Time"
          name="startTime"
          type="datetime-local"
          defaultValue={data?.startTime ? new Date(data.startTime).toISOString().slice(0, 16) : undefined}
          register={register}
          error={errors.startTime}
        />

       
        <InputField
          label="End Time"
          name="endTime"
          type="datetime-local"
          defaultValue={data?.endTime ? new Date(data.endTime).toISOString().slice(0, 16) : undefined}
          register={register}
          error={errors.endTime}
        />
<div className='flex flex-col gap-1 flex-1 min-w-[200px]'>
          <label className='text-sm text-gray-400'>Lesson</label>
          <Controller
            name="lessonId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={lessons.map((lesson: any) => ({ value: lesson.id, label: `${lesson.subject.name} - ${lesson.class.name}` }))}
                value={lessons.map((lesson: any) => ({ value: lesson.id, label: `${lesson.subject.name} - ${lesson.class.name}` })).find((opt: any) => opt.value === field.value) || null}
                onChange={(option: any) => field.onChange(option ? option.value : "")}
                isSearchable={true}
                isClearable={true}
                placeholder="Select a lesson..."
                className="text-sm"
              />
            )}
          />
          {errors.lessonId?.message && (
            <p className='text-sm text-red-500'>{errors.lessonId?.message.toString()}</p>
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
 
 export default ExamForm
 