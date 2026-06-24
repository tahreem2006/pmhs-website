"use client"
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';
const CapacityChart = ({data}:{data:any}) => {
  return (
    <div className='w-full h-[300px]'>
    <ResponsiveContainer width="100%" height="100%">
       <BarChart
       responsive
      data={data}
      barSize={25}
    >
      <CartesianGrid strokeDasharray="3 3"  vertical={false}  stroke="#e2e8f0"/>
      <XAxis dataKey="Grade" axisLine={false} tick={{fill:"#64748b", fontSize: 13}} tickLine={false} />
      <YAxis width={40} axisLine={false} tick={{fill:"#64748b", fontSize: 13}} tickLine={false} />
      <Tooltip 
            cursor={{fill: 'transparent'}}
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
          />
      <Legend  align="left" verticalAlign="top"   wrapperStyle={{paddingTop:"20px",paddingBottom:"40px"}} />
      <Bar 
            dataKey="Capacity" 
            fill="#cbd5e1"  
            legendType="circle" 
            activeBar={{ fill: '#94a3b8', stroke: 'none' }}  
            radius={[4, 4, 0, 0]} 
          />
          
 
          <Bar 
            dataKey="Enrolled" 
            fill="#1e40af" 
            legendType="circle" 
            activeBar={{ fill: '#3b82f6', stroke: 'none' }}  
            radius={[4, 4, 0, 0]} 
          />  
    </BarChart>
    </ResponsiveContainer>
    </div>
  )
}

export default CapacityChart
