import React from 'react';
import prisma from '@/lib/prisma';
import MaintainenceSroll from './MaintainenceSroll';

const Maintainence = async () => {
  // 1. Lowercase 'maintenanceTicket' and 2. Replaced the comma with a semicolon
  const maintainenceData = await prisma.maintenanceTicket.findMany({
    where: {
      status: "Pending",
    },
    orderBy: { createdAt: 'desc' },
  });

  const data = maintainenceData.map((mad) => ({ 
    id: mad.id,
    title: mad.title,
    location: mad.location,
    // 3. Changed 'ticket.createdAt' to 'mad.createdAt'
    date: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(mad.createdAt)
  }));

  return (
    <div className="w-full h-full min-h-[300px]">
      <MaintainenceSroll data={data} />
    </div>
  );
};

export default Maintainence;