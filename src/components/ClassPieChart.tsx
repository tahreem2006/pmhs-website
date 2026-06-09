"use client"
import { Pie, PieChart,Legend , XAxis, YAxis,  Tooltip } from 'recharts';
 
const data = [
    { name: 'Pass', value:45,fill:"#FFD580"},
    { name: 'Fail', value: 5,fill:"#808080"},
    
  ]

const PieChartPage= () => {
  return (
    <div className='bg-white flex flex-col justify-center items-center rounded-2xl p-4'>
      <div className='font-semibold w-full text-black mb-2 flex items-start'> <h3> Class Performance</h3></div>
      <div className='relative w-full '>
        <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx="50%"
        cy="100%"
        outerRadius="180%"
        innerRadius="99%"
        fill="#8884d8"
        label
        
      />
     
       <Legend   align="center" verticalAlign="top" wrapperStyle={{ paddingBottom: "24px",paddingTop: "px" }} />
    </PieChart>
    <span className='hidden lg:block absolute text-bold text-black text-lg bottom-[12%] left-[46%]'>90% </span>
    <span className='hidden lg:block   absolute text-bold text-gray-400 text-m bottom-[1%] left-[46%]'>Pass</span>
    </div>
    </div>
  )
}

export default PieChartPage
