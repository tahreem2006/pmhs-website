"use client";
import Image from "next/image";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
  { name: 'Jun', income: 2390, expense: 3800 },
  { name: 'Jul', income: 3490, expense: 4300 },
  { name: 'Aug', income: 4200, expense: 2100 },
  { name: 'Sep', income: 3800, expense: 2600 },
  { name: 'Oct', income: 4500, expense: 3100 },
  { name: 'Nov', income: 5100, expense: 4200 },
  { name: 'Dec', income: 6000, expense: 3500 },
];

const FinanceChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      
       <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Finance</h1>
        <Image src="/moreDark.png" alt="more options" width={20} height={20} /> 
      </div>

       <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
            
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
          
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} />
            
      
            <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
            
             <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "#e5e7eb" }} />
            <Legend align="center" verticalAlign="top" wrapperStyle={{ paddingBottom: "20px" }} />
            
           
            <Line
              type="monotone"
              dataKey="income"
              stroke="#6096ba" 
              strokeWidth={4}
              dot={{ fill: '#6096ba', r: 4 }}
              activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }}
            />
             
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#FFDBBB"  
              strokeWidth={4}
              dot={{ fill: '#FFDBBB', r: 4 }}
              activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }}
            />
            
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}

export default FinanceChart;
 