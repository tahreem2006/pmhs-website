 
import Image from "next/image";
import Performancegraph from "./Performancegraph";
import prisma from "@/lib/prisma";

 

const Performance =async () => {

  const PASSING_THRESHOLD = 40;
  const classes=await prisma.class.findMany({
   
    select:{
      name:true,
      students:{
          select:{
            results:{
              select:{
                score:true
              }
             
            }
          }
      }
    },
    orderBy: { name: 'asc' }
  })
 

    const data=classes.map((cls)=>{
      const studentsWithResults = cls.students.filter(
        (student) => student.results.length > 0
      );
      const totalTestedStudents = studentsWithResults.length;
      let passedCount = 0;
   
  cls.students.forEach((student)=>{
    if(student.results.length===0)
    {
      return;

    }

    const totalScore=student.results.reduce((sum,result)=>sum+result.score,0);
    const averageScore = totalScore / student.results.length;
    if (averageScore >= PASSING_THRESHOLD) {
      passedCount++;
    }

  });
  const calcPercentage = totalTestedStudents > 0 
  ? (passedCount / totalTestedStudents) * 100 
  : 0;
  return {
    name: cls.name,
      passPercentage: calcPercentage
  };

});
  return (
    <div  className="flex flex-col gap-8  ">
          <div className='flex justify-between'>
        <h1 className='text-lg'>Class-wise Performance</h1>
        <Image src="/moreDark.png" alt="" width={30} height={30} />
        </div>


       <Performancegraph data={data} />
    </div>
  )
}

export default Performance
