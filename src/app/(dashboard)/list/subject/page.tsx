import Pagination from "@/components/Pagation";
import Table from "@/components/Table";
import TableSearch from "@/components/Searchbar";
import Image from "next/image";
import FormModal from "@/components/FormModal";
import { Prisma, type Subject, type Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { items_per_page } from "@/lib/setting";
import { auth } from "@clerk/nextjs/server";

type SubjectList = Subject & { teachers: Teacher[] };

const getColumns = (role: string | undefined) => [
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  ...(role === "admin" ? [{
    header: "Action",
    accessor: "action",
    className: " ",
  }] : [])
];

const renderRow = (item: SubjectList, role: string | undefined, allTeachers: any) => (
  <tr key={item.id} className="border-t-2 rounded-xl odd:border-t-pink-400 even:border-t-yellow-400">
    <td className="flex flex-col my-4 px-2 justify-start">
      <h3 className="font-semibold">{item.name}</h3>
    
    </td>
    <td className="hidden md:table-cell">
      {item.teachers && item.teachers.length > 0
        ? item.teachers.map((teacher) => teacher.name).join(", ")
        : "No Teachers"}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="subject" type="edit" data={item} relatedData={{ teachers: allTeachers }} />
            <FormModal table="subject" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const subjectpage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const { page, ...queryParam } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.SubjectWhereInput = {};

  if (queryParam) {
    for (const [key, value] of Object.entries(queryParam)) {
      if (value != undefined) {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count, allTeachers] = await prisma.$transaction([
    prisma.subject.findMany({
      where: query,
      include: {
        teachers: true,
      },
      take: items_per_page,
      skip: items_per_page * (p - 1)
    }),
    prisma.subject.count({ where: query }),
    prisma.teacher.findMany({
      select: { id: true, name: true, surname: true }, 
    })
  ]);

  const columns = getColumns(role);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
       <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Subject</h1>
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
              <FormModal table="subject" type="create" relatedData={{ teachers: allTeachers }} />
            )}
          </div>
        </div>
      </div>

       <div>
        <Table column={columns} renderRow={(item) => renderRow(item as SubjectList, role, allTeachers)} data={data}  />
      </div>

       <div>
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default subjectpage;