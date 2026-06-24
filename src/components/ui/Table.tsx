import { table } from "console"
import Image from "next/image"
import Link from "next/link"
import { role } from "@/lib/data"

export type Column = {
    header: string;
    accessor: string;
    className?: string;  
  };
 
const Table = ({column ,renderRow,data} :{column:Column[]; renderRow:(item:any) =>React.ReactNode;
data:any[]}
    

) => {
  return (
    <table className="w-full mt-4 p-4">
        <thead  >
            <tr className="text-left    ">{column.map((col)=>(<th  key={col.header} className={`text-l ${col.className || ""} text-gray-500` }> {col.header}</th>))}</tr>
            </thead>

            <tbody  >
                {data.map((item)=> renderRow(item))}
            </tbody>
    </table>
  )
}

export default Table


