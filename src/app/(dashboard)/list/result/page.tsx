import Pagination from "@/components/Pagation";
import Table from "@/components/Table";
import TableSearch from "@/components/Searchbar";
import Image from "next/image";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { items_per_page } from "@/lib/setting";
import { auth } from "@clerk/nextjs/server";
import { currentId } from "@/lib/utils";

 type ResultList = {
  id: string;
  score: number;
  student: { name: string; surname: string };
  subject: { name: string };
  exam: {
    startTime: Date;
    lesson: {
      class: { name: string };
      teacher: { name: string; surname: string };
    };
  };
};

 const getColumns = (role: string | undefined) => [
  {
    header: "Subject",
    accessor: "subject",
    className: " ",
  },
  {
    header: "Class",
    accessor: "class",
    className: " ",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell ",
  },
  {
    header: "Student",
    accessor: "student",
    className: " ",
  },
  {
    header: "Score",
    accessor: "score",
    className: " ",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden lg:table-cell",
  },
  ...(role === "admin" ? [{
    header: "Action",
    accessor: "action",
    className: " ",
  }] : [])
];

 const renderRow = (item: ResultList, role: string | undefined,allExams:any,allStudent:any,allSubject:any) => (
  <tr className="border-t-2 rounded-xl odd:border-t-pink-400 even:border-t-yellow-400">
    <td className="flex my-4 gap-3 justify-start px-2 items-center" >
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.subject?.name || "N/A"}</h3>
      </div>
    </td>

    <td className="">
      {item.exam?.lesson?.class?.name || "N/A"}
    </td>
       
    <td className="hidden md:table-cell">
      {item.exam?.lesson?.teacher ? `${item.exam.lesson.teacher.name} ${item.exam.lesson.teacher.surname}` : "N/A"}
    </td>
    <td className="">
      {item.student ? `${item.student.name} ${item.student.surname}` : "N/A"}
    </td>
    <td className="">
      {item.score}
    </td>
    <td className="hidden lg:table-cell">
      {item.exam?.startTime ? new Intl.DateTimeFormat("en-US").format(new Date(item.exam.startTime)) : "N/A"}
    </td>

    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="result" type="edit" id={item.id}  data={item} relatedData={{students:allStudent,exams:allExams,subjects:allSubject}}/>
            <FormModal table="result" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

 const exampage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

   const {userId, sessionClaims } =await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentId=userId;

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.ResultWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value != undefined) {
        switch (key) {
          case "studentId":
            query.studentId = value;
            break;
          case "subjectId":
            query.subjectId = value;
            break;
          case "classId":
            query.exam = { lesson: { classId: value } };
            break;
          case "search":
            query.OR = [
              { subject: { name: { contains: value, mode: 'insensitive' } } },
              { student: { name: { contains: value, mode: 'insensitive' } } },
              {
                exam: {
                  lesson: {
                    teacher: {
                      OR: [
                        { name: { contains: value, mode: 'insensitive' } },
                        { surname: { contains: value, mode: 'insensitive' } }
                      ]
                    }
                  }
                }
              },
            ];
            break;
          default:
            break;
        }
      }
    }
  }
  switch(role)
  {
    case "admin":
      break;
      case "teacher":
        query.exam={
            lesson:{teacher:{clerkId:currentId}}

        }
        break;
        case "student" : query.student={clerkId:currentId}
        break;
        default:
          break;
          
  }

   const [data, count,allStudent,allExams,allSubject] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: { select: { name: true, surname: true } },
        subject: { select: { name: true } },
        exam: {
          include: {
            lesson: {
              include: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } }
              }
            }
          }
        }
      },
      take: items_per_page,
      skip: (p - 1) * items_per_page,
    }),
    prisma.result.count({ where: query }),
    prisma.student.findMany({select:{id:true,username:true}}),
    prisma.exam.findMany({select:{id:true,title:true}}),
    prisma.subject.findMany({select:{id:true,name:true}}),
  ]);
   
   const columns = getColumns(role);
   
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
       <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All results</h1>
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
              <FormModal table="result" type="create" relatedData={{students:allStudent,exams:allExams,subjects:allSubject}} />
            )}
          </div>
        </div>
      </div>

       <div>
        <Table column={columns} renderRow={(item) => renderRow(item as unknown as ResultList, role,allExams,allStudent,allSubject)} data={data} />
      </div>

       <div>
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default exampage; 