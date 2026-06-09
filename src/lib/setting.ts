export const items_per_page=10

type RouteAccessMap={
    [key:string]:string[];

}

export  const routerAccessMap:RouteAccessMap={

    "/admin(.*)":["admin"],//The Code: The (.*) syntax is a regular expression wildcard meaning "and anything that comes after this slash".
    "/student(.*)":["student"],
    "/teacher(.*)":["teacher"],
    "/list/teacher":["admin","teacher"],
    "/list/student":["admin","teacher"],
    "/list/subject":["admin"],
    "/list/classes":["admin","teacher"],
    "/list/lesson":["admin","teacher","student"],
    "/list/exam":["admin","teacher","student"],
    "/list/result":["admin","teacher","student"],
    "/list/events":["admin","teacher","student"],
    "/list/announcements":["admin","teacher","student"],
    



    




}