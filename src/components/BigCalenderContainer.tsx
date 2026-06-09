import React from 'react'
import prisma from '@/lib/prisma'
import BigCalender from "./BigCalender"
const BigCalenderContainer =async  ({type,id}:{type:"teacherId" | "classId",id:string}) => {

    const rawData=await prisma.lesson.findMany({
        where:{
            ...(type==="teacherId"?{teacher:{id:id}}:{classId:id})
        },
        include:{
            subject:true
        }
    })
    const dayOfWeekMap: Record<string, number> = {
        MONDAY: 1,
        TUESDAY: 2,
        WEDNESDAY: 3,
        THURSDAY: 4,
        FRIDAY: 5,
        SATURDAY: 6,
      };


        const formatDateForCalender=(lessons)=>{
            const today=new Date();

            const currentWeekDay=today.getDay()

            return lessons.map(lesson=>
                {
                    const targetDayNumber=dayOfWeekMap[lesson.day]
                 const  diff=targetDayNumber-currentWeekDay;
                    //so we get need week routine  
                    const adjustedStart=new Date(lesson.startTime);
                    adjustedStart.setFullYear(today.getFullYear(),today.getMonth(),today.getDate()+diff)

                    const adjustedEnd=new Date(lesson.endTime);
                   adjustedEnd.setFullYear(today.getFullYear(),today.getMonth(),today.getDate()+diff)

                    return {
                        title: lesson.subject.name,
                        start: adjustedStart,
                        end: adjustedEnd,
                      };
                }
                

            )

        

        
        }
        
        const data = formatDateForCalender(rawData)
  return (
    <div>
      <BigCalender data={data}/>
    </div>
  )
}

export default BigCalenderContainer
