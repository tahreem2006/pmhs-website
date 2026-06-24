 
 "use client";
 import { zodResolver } from '@hookform/resolvers/zod';
 import { z } from 'zod'; // or 'zod/v4'
 import {  toast } from 'react-toastify';
 import InputField from './InputField';
 import Image from "next/image"
 
 import { FieldError } from 'react-hook-form';
 import { teacherschema,Teacherschema } from '@/lib/formValidationSchema';
 import { createTeacher, updateTeacher,deleteTeacher } from '@/lib/actions';
 import { useForm } from 'react-hook-form';
 import { useFormState } from "react-dom";
 import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
 import { useRouter } from 'next/navigation';
 import { CldUploadWidget } from 'next-cloudinary';
 const TeacherForm = ({setOpen,type,data,relatedData}: {setOpen:Dispatch<SetStateAction<boolean>>,type:"edit" | "create" ; data?:any,relatedData:any;}
 
 ) => {
     const actionToTake = type === "create" ? createTeacher:updateTeacher;
     const {
         register,
         handleSubmit,
          
         formState: { errors ,isSubmitting},
       } = useForm<Teacherschema>({
         resolver: zodResolver(teacherschema)  ,
         defaultValues: data,
       });
         const {subjects}=relatedData;
       const [img,setImg]=useState<string | undefined>(data?.img);
 const [state, formAction] = useFormState(actionToTake, { success: false, error: false });
         const router=useRouter();
 
         const onSubmit = handleSubmit(
          (data) => {
            console.log("✅ FRONTEND PASSED! Sending this to server:", data);
            formAction({...data,img:img});
          },
          (errors) => {
            console.log("❌ FRONTEND BLOCKED! Zod hates this field:", errors);
          }
        );
       useEffect(()=>{
         if(state.success){
                 toast(`Teacher has been ${type==="create"?"created":"updated"}`);
                 router.refresh();
                 setOpen(false)
         }
       },[state])
   return (
     <form className='flex flex-col gap-2'  onSubmit={onSubmit}  >
       <h1 className='text font-semibold'>{type==="create"?"Create a new Teacher":"Update the Teacher"}</h1>
       <span className='my-2 text-gray-600'>Authentication Details</span>
       {data && <input type="hidden" {...register("id")} defaultValue={data.id} />}
       <div className=' w-full flex flex-wrap gap-6  '> 
 
      <InputField label="First Name" name="name" defaultValue={data?.name}  register={register} error={errors.name}  />
      <InputField label="Surname Name" name="surname" defaultValue={data?.surname}  register={register} error={errors.surname}  />
      <InputField label="Phone" type="phone" name="phone" defaultValue={data?.phone}  register={register} error={errors.phone}  />
      <InputField label="Username" type="username" name="username" defaultValue={data?.username}  register={register} error={errors.username}  />
      <InputField label="Password" type="password" name="password" defaultValue={data?.password}  register={register} error={errors.password}  />
      <InputField label="Email" type="email" name="email" defaultValue={data?.email}  register={register} error={errors.email}  />
      <InputField label="Address"  name="address" defaultValue={data?.address}  register={register} error={errors.address}  />
 
      <div className='flex flex-col gap-1 flex-1'>
         <label className='text-sm  text-gray-400'  >Subjects</label>
 
         <div className='flex flex-col gap-2 max-h-[60px] overflow-y-scroll ring-[1.5px] ring-gray-300 p-3 rounded-md text-sm'>
           {subjects.map((subject:{id:string,name: string})=>(
             <label key={subject.id} className='flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded ' >
               <input type="checkbox" value={subject.id}  {...register("subjects")}
               defaultChecked={data?.subjects?.some((s: { id: string }) => s.id === subject.id)} />
 <span>{subject.name}  </span>
             </label>
           )
         )}
         </div>
      
       {errors.subjects?.message && <p className='text-sm text-red-500'>{errors.subjects?.message.toString()}</p>}
       </div>
  
  <div className='flex flex-col gap-1 flex-1'>
        <label className='text-sm text-gray-400'  >Sex</label>
     <select  {...register("sex")} className='ring-[1.5px] ring-gray-300  px-2 py-2 rounded-md text-sm' defaultValue={data?.sex}>
        <option value="MALE">Male </option>
       
        <option value="FEMALE">Female </option>
     </select>
      {errors.sex?.message && <p className='text-sm text-red-500'>{errors.sex?.message.toString()}</p>}
      </div>
      
<div className='flex '>
      <CldUploadWidget uploadPreset="school" onSuccess={(result,{widget})=>{ if (result.info && typeof result.info !== "string") {
              setImg(result.info.secure_url); 
            }
       }}>
  {({ open }) => {
    return (
      <div className='text-xs flex gap-2 px-2 items-center ' onClick={()=>open()}>
      <Image src="/upload.png" alt="" width={30} height={30} /> 
      <span className='text-md text-gray-600'>Upload a photo</span>
  </div>

  
    );
  }}
  
</CldUploadWidget>

  <div className='w-24 bg-gray-400 relative h-24 rounded-full  '> <p className='relative top-9 left-5 text-white text-xs '>No image</p>
{img && <Image src={img} alt="" width={40} 
    height={40} 
    className="rounded-full w-24 z-10 h-24   absolute top-0 right-0 object-cover" />}
</div> 
       </div>
      
       </div>
       
 
 
         
   
     
             {state.error && <span className='text-red-500 text-sm'>Something went wrong.Please try again!</span>}
 
        
 
 
       <div  className='flex  my-4 w-full justify-center'>
       <button className='bg-blue-400 w-[100px] px-4 py-2 rounded-xl text-white'>{type==="create"?"Create":"Update"}</button>
       </div>
     </form>
   )
 }
 
 export default TeacherForm
 