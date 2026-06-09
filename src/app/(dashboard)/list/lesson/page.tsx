import Pagination from "@/components/Pagation";
import Table from "@/components/Table";
import TableSearch from "@/components/Searchbar";
import Image from "next/image";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import prisma from "@/lib/prisma";
import { items_per_page } from "@/lib/setting";
import { Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { type LessonSchema } from "@/lib/formValidationSchema";
type LessonList = {
  id: string;
  day: string; 
  subject: { name: string };
  class: { name: string };
  teacher: { name: string; surname: string };
};
 const getColumns = (role: string | undefined) => [
  {
    header: "Subject",
    accessor: "subject",
    className: " ",
  },
  {
    header: "Day",
    accessor: "day",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: " ",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: " ",
  },
  ...(role === "admin" ? [{
    header: "Action",
    accessor: "action",
    className: " ",
  }] : [])
];

 const renderRow = (item: LessonList, role: string | undefined,allClasses:any,allSubject:any,allTeacher:any) => (
  <tr className="border-t-2 rounded-xl odd:border-t-pink-400 even:border-t-yellow-400">
    <td className="flex my-4 gap-3 justify-start px-2 items-center" >
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.subject?.name || "N/A"}</h3>
      </div>
    </td>
    <td className="md:table-cell hidden">
      {item.day}
    </td>
    <td className=" ">
      {item.class?.name || "N/A"}
    </td>
    <td className=" ">
      {item.teacher ? `${item.teacher.name} ${item.teacher.surname}` : "N/A"}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
             <FormModal table="lesson" type="edit" id={item.id} data={item} relatedData={{classes:allClasses,teachers:allTeacher,subjects:allSubject}} />
            <FormModal table="lesson" type="delete" id={item.id} />
          </>
        )}  
      </div>
    </td>
  </tr>
);

 const lessonspage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

   const { userId,sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentId=userId;


  const { page, ...queryParam } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.LessonWhereInput = {};
  
  if (queryParam) {
    for (const [key, value] of Object.entries(queryParam)) {
      if (value != undefined) {
        switch (key) {
          case "search":
            query.OR = [
              { subject: { name: { contains: value, mode: "insensitive" } } },
              { teacher: { name: { contains: value, mode: "insensitive" } } }
            ];
            break;
          case "teacherId":
            query.teacherId = value;
            break;
          case "classId":
            query.classId =  value ;  
            break;
          default:
            break;
        }
      }
    }
  }

  switch(role){
    case "admin":break;
    case "teacher":  query.teacher={clerkId:currentId
    }
    break;
    case "student": query.class={students:{some:{clerkId:currentId}}}
    break;
    default:break;
    

  }

   const [data, count,allClasses,allSubject,allTeacher] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      include: {
        subject: { select: { name: true } },
        class: { select: { name: true } },
        teacher: { select: { name: true, surname: true } },
      },
      take: items_per_page,
      skip: items_per_page * (p - 1)
    }),
    prisma.lesson.count({ where: query }),
    prisma.class.findMany({select:{ id:true,name:true }}),
    prisma.subject.findMany({select:{ id:true,name:true }}),
    prisma.teacher.findMany({select:{ id:true,name:true,surname:true }}),
    
  ]);

   const columns = getColumns(role);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
       <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All lessons</h1>
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
              <FormModal table="lesson" type="create" relatedData={{classes:allClasses,teachers:allTeacher,subjects:allSubject}} />
            )}
          </div>
        </div>
      </div>

       <div>
        <Table column={columns} renderRow={(item) => renderRow(item as unknown as LessonList, role,allClasses,allSubject,allTeacher)} data={data} />
      </div>

       <div>
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default lessonspage;