"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
 import Image from "next/image";


 
    

        <Image src="/moreDark.png" alt="" width={20} height={20} />


const Attendence = () => {
  return (
    <div className='flex  p-2 bg-white flex-col mx-2 h-[350px]'>
        <div className='flex justify-between gap-2 px-2 '>
            <h1 className='text-lg'>Attendence</h1>

    <Image src="/moreDark.png" alt="" width={32} height={32} />
        </div>

        <div>
        <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.318 }}
      responsive
      data={data}
      barSize={25}
    >
      <CartesianGrid strokeDasharray="3 3"  vertical={false} />
      <XAxis dataKey="name" axisLine={false}  tick={{fill:"#6096ba"}} tickLine={false} />
      <YAxis width="auto" axisLine={false} tick={{fill:"#6096ba"}} tickLine={false} />
      <Tooltip  contentStyle={{borderRadius:"10px",borderColor:"lightgray"}}/>
      <Legend  align="left" verticalAlign="top"   wrapperStyle={{paddingTop:"20px",paddingBottom:"40px"}} />
      <Bar dataKey="present" fill="#FFDBBB" legendType="circle" activeBar={{ fill: '#FFDBBB', stroke: 'blue' }} radius={[10, 10, 0, 0]} />
      <Bar dataKey="absent" fill="#6096ba" legendType="circle" activeBar={{ fill: '#6096ba', stroke: 'purple' }} radius={[10, 10, 0, 0]} />
     
    </BarChart>
        </div>
      
    </div>
  )
}

export default Attendence
