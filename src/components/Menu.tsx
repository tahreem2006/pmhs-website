import Link from "next/link"
import Image from "next/image"
import { currentUser } from '@clerk/nextjs/server';
 
const menuitems = [
  {
    title: "Menu",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"]
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teacher",
        visible: ["admin", "teacher"]
      },{
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lesson",
        visible: ["admin", "teacher","student"]
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/student",
        visible: ["admin", "teacher"]
      },
       
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"]
      },
     
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subject",
        visible: ["admin", "teacher", "student", "parent"]
      },
      
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/result",
        visible: ["admin", "teacher", "student", "parent"]
      },
    
      {
        icon: "/announcement.png",
        label: "Notices",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"]
      },
       
       
      
      
      {
        icon: "/exam.png",
        label: "Exam",
        href: "/list/exam",
        visible: ["admin", "teacher", "student", "parent"]
      }
    ]
  },
  {
    title: "Other",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"]
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"]
      }
    ]
  }
];

 
 const Menu = async() => {

  const user =await currentUser();
  const role=user?.publicMetadata?.role as string;


   return (
     <div className="py-6 px-2">
       {menuitems.map(i=>(

        <div className="flex flex-col gap-2 " key={i.title}>
            <span className="my-2   text-gray-400 lg:block"> {i.title} </span>
            {i.items.map((item)=>
             {
              if(item.visible.includes(role) ) 
               {
                return (<Link className=" hover:bg-blue-50 p-2 px-4 hover:border hover:border-blue-100 rounded-l flex md:justify-start md:items-start justify-center items-center gap-4" href={item.href}  key={item.label} >
                  <Image src={item.icon} alt="" width={20} height={20} />
                    <span className="hidden lg:block  text-gray-500"> {item.label} </span>
                    </Link> )
               }
              }
             
            )
          }
        </div>
       ))}
     </div>
   )
 }
 
 export default Menu
 