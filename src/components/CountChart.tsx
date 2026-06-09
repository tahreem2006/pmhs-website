"use client";
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';
 
import Image from "next/image"

const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };

const data = [
     
    {
        name: 'Girls',
        count:1000,
        fill: '#FFDBBB',
      },
    {
      name: 'Boys',
      count:1234,
      fill: '#6096ba',
    },
    
  ];

  

const countchart = () => {
  return (
    <div className='p-4  bg-white flex flex-col   h-[340px]'>
      <div className='flex justify-between'>
        <h1 className='text-lg'>Students</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
        </div>
      <div className=' relative text-xs w-full h-full '> 
      <RadialBarChart
      style={{ width: '100%', maxWidth: '900px', maxHeight: '80vh', aspectRatio: 0.918 }}
      responsive
      cx="50%"
      innerRadius="40%"  
          
      barSize={25}
      data={data}

    >
      <RadialBar label={{ position: 'insideStart', fill: '#fff' }} background dataKey="count" />
    
       <Tooltip />
      
    </RadialBarChart>
    <Image className='absolute top-[43%] left-[44%]' src="/malefemale.png" alt='' width={30} height={30} /> 
    </div>
      <div className='flex justify-between px-10'>
      <div className='flex flex-col '>
        <div className='bg-dblue w-3 h-3 rounded-full '></div>
            <h1 className='font-semibold text-sm'>1234</h1>
            <p className='text-slate-500 text-xs'>Boys</p>
      </div>
      <div className='flex flex-col '>
        <div className='bg-lorange w-3 h-3 rounded-full '></div>
            <h1 className='font-semibold text-sm'>1000</h1>
            <p className='text-slate-500 text-xs'>Girls</p>
      </div>
     
      
      </div>
    </div>
  )
}

export default countchart
