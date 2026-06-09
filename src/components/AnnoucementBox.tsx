import React from 'react'
import prisma from '@/lib/prisma';
import AnnouncementScroll from "./AnnoucementScroll"
import { auth } from '@clerk/nextjs/server';
const Annoucementscroll = async() => {

   const rawAnnouncements=await prisma.announcement.findMany({
    orderBy:{date:"desc"},
    take: 10,
}) ;

const formattedAnnouncements=rawAnnouncements.map((anc)=>({
        id:anc.id,
        title:anc.title,
        date: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(anc.date)), 
    description: anc.description
}));


const {  sessionClaims } = await auth();
const role = (sessionClaims?.metadata as { role?: string })?.role;
 
  return (
    
    <div>
    <AnnouncementScroll announcements={formattedAnnouncements} role={role}/>
    </div>
  )
}

export default Annoucementscroll
