import Pagination from "@/components/Pagation";
import Table from "@/components/Table";
import TableSearch from "@/components/Searchbar";
import Image from "next/image";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import { Prisma, type Class, type Event } from "@prisma/client";
import prisma from "@/lib/prisma";
import { items_per_page } from "@/lib/setting";
 import { auth } from "@clerk/nextjs/server";
import { currentId } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

type Events = Event & { class: Class }

 const getColumns = (role: string | undefined) => [
  {
    header: " Info",
    accessor: "info",
    className: " ",
  },
  {
    header: "Class",
    accessor: "class",
    className: " ",
  },
  {
    header: "Day",
    accessor: "day",
    className: " ",
  },
  {
    header: "StartTime",
    accessor: "startTime",
    className: "",
  },
  {
    header: "EndTime",
    accessor: "endTime",
    className: " hidden md:table-cell",
  },
  ...(role === "admin" ? [{
    header: "Action",
    accessor: "action",
    className: " ",
  }] : [])
];

 const renderRow = (item: Events, role: string | undefined) => (
  <tr className="border-t-2 rounded-xl odd:border-t-pink-400 even:border-t-yellow-400">
    <td className="flex my-4 gap-3 justify-start px-2 items-center" >
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.title}</h3>
        <h6 className="text-gray-500 text-sm">{item.id}</h6>
      </div>
    </td>

    <td className=" ">{item.class ? item.class.name : "N/A"}</td>
       
    <td className="">
      {new Intl.DateTimeFormat("en-US").format(new Date(item.startTime))}
    </td>
    <td className="">
      {new Date(item.startTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </td>
    <td className="hidden md:table-cell">
      {new Date(item.endTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </td>

    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="events" type="edit" id={item.id} />
            <FormModal table="events" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

 const exampage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentId = userId;

  const { page, ...queryParam } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.EventWhereInput = {};
  
  if (queryParam) {
    for (const [key, value] of Object.entries(queryParam)) {
      if (value != undefined) {
        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
        }
        
      }
    }
  }
  switch(role)
  {
    case "admin":
      break;
      case "teacher": query.OR=[{classId:null},{class:{lessons:{some:{teacher:{clerkId:currentId!}}}}}]
   
      break;
      case "student": query.OR=[{classId:null},{class:{students:{some:{clerkId:currentId!}}}}]
      break;
      default:
        break;

  }
   
  const [data, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: query,
      include: {
        class: true
      },
      take: items_per_page,
      skip: items_per_page * (p - 1)
    }),
    prisma.event.count({ where: query })
  ]);
  console.log("=== DEBUG INFO ===");
  console.log("Logged in Role:", role);
  console.log("Logged in ID:", currentId);
  console.log("Prisma Query:", JSON.stringify(query, null, 2));
  
  const columns = getColumns(role);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
    
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All events</h1>
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
              <FormModal table="events" type="create" />
            )}
          </div>
        </div>
      </div>

      
      <div>
        <Table column={columns} renderRow={(item) => renderRow(item, role)} data={data} />
      </div>

     
      <div>
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default exampage;
 