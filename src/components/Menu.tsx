import Link from "next/link";
import { currentUser } from '@clerk/nextjs/server';
import { SignOutButton } from "@clerk/nextjs";
 import Image from "next/image";
const menuitems = [
  {
    title: "Menu",
    items: [
      {
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"]
      },
      {
        label: "Teachers",
        href: "/list/teacher",
        visible: ["admin", "teacher"]
      },
      {
        label: "Lessons",
        href: "/list/lesson",
        visible: ["admin", "teacher","student"]
      },
      {
        label: "Students",
        href: "/list/student",
        visible: ["admin", "teacher"]
      },
      {
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"]
      },
      {
        label: "Subjects",
        href: "/list/subject",
        visible: ["admin", "teacher", "student", "parent"]
      },
      {
        label: "Results",
        href: "/list/result",
        visible: ["admin", "teacher", "student", "parent"]
      },
      {
        label: "Notices",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"]
      },
      {
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
        label: "Logout",
        href: "#",
        visible: ["admin", "teacher", "student", "parent"]
      }
    ]
  }
];

const Menu = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata?.role as string;

  return (
    <div className="py-6 px-2">
      {menuitems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="my-2 text-sm text-gray-400 font-semibold">{i.title}</span>
          
          {i.items.map((item) => {
            if (item.label === "Logout") {
                return (
                  <SignOutButton key={item.label}>
                    {/* Using w-full and text-left so the button looks exactly like the Links */}
                    <button className="w-full flex text-left  hover:bg-blue-50 p-2 gap-2 px-4 hover:border hover:border-blue-100 rounded-lg transition-colors">
                      <span className="text-gray-500 font-medium"> {item.label} </span>
                      <Image src="/logout.png" alt="Logout" width={18} height={18} /> 
                    </button>
                  </SignOutButton>
                );
              }
            if (item.visible.includes(role)) {
              return (
                <Link 
                  href={item.href}  
                  key={item.label}
                  className="block hover:bg-blue-50 p-2   hover:border hover:border-blue-100 rounded-lg transition-colors" 
                >
               
                  <span className="text-gray-500 font-medium"> {item.label} </span>
                </Link> 
              );
            }
            return null;  
          })}
        </div>
      ))}
    </div>
  );
};
 
export default Menu;