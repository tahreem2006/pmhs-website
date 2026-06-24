 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
 import Image from "next/image";
import CapacityChart from './CapacityChart';
import prisma from '@/lib/prisma';


 
 

      


const Capacitybox = async() => {
  const classes=await prisma.class.findMany({
    include:{
      _count:{
        select:{
          students:true
        }
      }
    },
    orderBy: {
      name: 'asc'  
    }
  })

  const data=classes.map((cls)=>({
      Grade:cls.name,
      Enrolled:cls._count.students,
      Capacity:cls.capacity,
  }));

  return (
    <div className='flex  p-2 bg-white flex-col mx-2 min-h-[300px] '>
        <div className='flex justify-between gap-2 px-2 '>
            <h1 className='text-lg'>Real-time Seat Allocation</h1>

   
        </div>

        
       <CapacityChart data={data}/>
       
      
    </div>
  )
}

export default Capacitybox
