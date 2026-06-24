import Pagination from "@/components/Pagation";
import Table from "@/components/Table";
import TableSearch from "@/components/Searchbar";
import Image from "next/image";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import type { Teacher, Subject, Class } from "@prisma/client";
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { items_per_page } from "@/lib/setting"
import { auth } from "@clerk/nextjs/server";

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };

 const getColumns = (role: string | undefined) => [
  {
    header: "Info",
    accessor: "info",
  },
   
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden lg:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: " ",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  ...(role === "admin" ? [{
    header: "Actions",
    accessor: "action",
  }] : [])
];

 const renderRow = (item: TeacherList, role: string | undefined,allsubject:any) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 border-t-2 odd:border-t-teal-300 even:border-t-purple-300 text-sm hover:bg-purple-50"
  >
    <td className="flex items-center gap-4 p-4">
      <Image
        src={item.img || "/noavatar.jpg"}
        alt=""
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item?.email}</p>
      </div>
    </td>
 
    <td className="hidden md:table-cell">
      {item.subjects ? item.subjects.map((subject) => subject.name).join(", ") : "None"}
    </td>
    <td className="hidden lg:table-cell">
      {item.classes ? item.classes.map((classItem) => classItem.name).join(", ") : "None"}
    </td>
    <td className="">{item.phone}</td>
    <td className="hidden lg:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="teacher" type="edit" data={item} relatedData={{subjects:allsubject}} />
            <FormModal table="teacher" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

 const TeacherListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  
   const { sessionClaims } =await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const { page, ...queryParam } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.TeacherWhereInput = {};

  if (queryParam) {
    for (const [key, value] of Object.entries(queryParam)) {
      if (value != undefined) {
        switch (key) {
          case "classId":
            query.lessons = {
              some: { classId: value }
            };
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

   const [data, count,allsubject] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: query,
      include: {
        subjects: true,
        classes: true,
      },
      take: items_per_page,
      skip: items_per_page * (p - 1)
    }),
    prisma.teacher.count({ where: query }),
    prisma.subject.findMany({select:{id:true,name:true}} )
  ]);

   const columns = getColumns(role);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
       <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
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
              <FormModal table="teacher" type="create" relatedData={{subjects:allsubject}} />
            )}
          </div>
        </div>
      </div>
    
       <Table column={columns} renderRow={(item) => renderRow(item as TeacherList, role,allsubject)} data={data} />
     
       <Pagination page={p} count={count} />
    </div>
  );
};

export default TeacherListPage;