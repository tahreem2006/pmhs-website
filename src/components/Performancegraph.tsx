 "use client"
import { BarChart, Bar,Legend , XAxis, YAxis,ResponsiveContainer, Tooltip,Cell} from 'recharts';
const Performancegraph = ({data}:{data:any}) => {
   return (
    <div className="w-[94%] flex items-start justify-start outline-none h-[270px] focus:outline-none" >
    <ResponsiveContainer width="100%" className="outline-none"  height="80%">
    <BarChart className="outline-none" 
 layout="vertical" barCategoryGap={0}
  data={data}
>
  <Bar dataKey="passPercentage" fill="#1e40af"  activeBar={{ fill: '#3b82f6', stroke: 'blue' }}
          radius={[0, 1, 1, 0]} name="Pass Rate (%)" barSize={25}>  
          </Bar> 

  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: "8px" }} />
  <XAxis type="number" interval={0} domain={[0, 100]}  tick={{fill:"#64748b"}} tickLine={false} />
  
  <Legend align="center" verticalAlign="top" wrapperStyle={{ paddingBottom: "24px" }} />
  <YAxis  interval={0} width={85} type="category" dataKey="name"  axisLine={false} tick={{fill:"#6096ba"}} tickLine={false} />
</BarChart>
</ResponsiveContainer>
 </div >
  )
}

export default Performancegraph
