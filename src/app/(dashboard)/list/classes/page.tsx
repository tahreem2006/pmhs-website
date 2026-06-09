import Pagination from "@/components/Pagation";
import Table from "@/components/Table";
import TableSearch from "@/components/Searchbar";
import Image from "next/image";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import prisma from "@/lib/prisma";
import { items_per_page } from "@/lib/setting";
import { Prisma, type Teacher, type Class, type Grade } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
 
 

type ClassList = Class & { supervisor: Teacher } & { grade: Grade }

 const getColumns = (role: string | undefined) => [
  {
    header: "Name",
    accessor: "name",
    className: "",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: " ",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden lg:table-cell",
  },
  ...(role === "admin" ? [{
    header: "Action",
    accessor: "action",
    className: " ",
  }] : [])
];

 const renderRow = (item: ClassList, role: string | undefined,allTeachers:any,allgrades:any) => (
  <tr className="border-t-2 rounded-xl odd:border-t-pink-400 even:border-t-yellow-400">
    <td className="flex my-4 gap-3 justify-start px-2 items-center" >
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
      </div>
    </td>

    <td className=" ">{item.capacity}</td>
    <td className="md:table-cell hidden">{item.grade.level}</td>
    <td className="lg:table-cell hidden">
      {item.supervisor ? `${item.supervisor.name} ${item.supervisor.surname}` : "No Supervisor"}
    </td>

    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="classes" type="edit" id={item.id} data={item}  relatedData={{teachers:allTeachers,grades:allgrades}}/>
            <FormModal table="classes" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

 
const classespage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
 
   
  const { page, ...queryParam } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.ClassWhereInput = {};
  
  if (queryParam) {
    for (const [key, value] of Object.entries(queryParam)) {
      if (value != undefined) {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          case "supervisorId":
            query.supervisorId = value;
            break;
          default:
            break;
        }
      }
    }
  }
 
  const [data, count,allTeachers,allgrades] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: {
        supervisor: true,
        grade: true,
      },
      take: items_per_page,
      skip: items_per_page * (p - 1)
    }),
    prisma.class.count({ where: query }),
    prisma.teacher.findMany({ select:{id:true,name:true,surname:true} }),
    prisma.grade.findMany({ select:{id:true,level:true} })
  ]);

   
  const columns = getColumns(role);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
     
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-300">
              <Image src="/filter.png" alt="" width={16} height={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-300">
              <Image src="/sort.png" alt="" width={16} height={16} />
            </button>
            {role === "admin" && (
              <FormModal table="classes" type="create" relatedData={{teachers:allTeachers,grades:allgrades}} />
            )}
          </div>
        </div>
      </div>

   
      <div>
        <Table column={columns} renderRow={(item) => renderRow(item, role,allTeachers,allgrades)} data={data} />
      </div>

     
      <div>
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default classespage;