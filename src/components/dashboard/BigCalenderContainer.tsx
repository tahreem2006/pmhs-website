import React from 'react'
import prisma from '@/lib/prisma'
import BigCalender from "./BigCalender"
import { currentUser } from '@clerk/nextjs/server' // 1. IMPORT CLERK CURRENT USER

// Move helper maps outside the component so they don't recreate on every render
const dayOfWeekMap: Record<string, number> = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

const BigCalenderContainer = async ({ type, id }: { type: "teacherId" | "classId", id: string }) => {

  // 2. Fetch the current logged-in Clerk User
  const user = await currentUser();

  // 3. Build a safe query condition that bypasses the MongoDB ID error
  let queryCondition = {};

  if (type === "teacherId") {
    // Look up the lessons through the Teacher's username instead of the raw Clerk ID!
    queryCondition = {
      teacher: {
        username: user?.username || ""
      }
    };
  } else {
    // If it's a classId, query normally
    queryCondition = { classId: id };
  }

  // 4. Fetch raw data from the database using our safe condition
  const rawData = await prisma.lesson.findMany({
    where: queryCondition,
    include: {
      subject: { select: { name: true } }
    }
  })

  const today = new Date();
  const currentWeekDay = today.getDay(); 

  // Clean, flat mapping of your array directly inline
  const data = rawData.map((lesson: any) => {
    const targetDayNumber = dayOfWeekMap[lesson.day] ?? 1;
    const diff = targetDayNumber - currentWeekDay;

    const adjustedStart = new Date(lesson.startTime);
    adjustedStart.setFullYear(today.getFullYear(), today.getMonth(), today.getDate() + diff);

    const adjustedEnd = new Date(lesson.endTime);
    adjustedEnd.setFullYear(today.getFullYear(), today.getMonth(), today.getDate() + diff);

    return {
      title: lesson.subject?.name || lesson.name || "Lesson",
      start: adjustedStart,
      end: adjustedEnd,
    };
  });

  return (
    <div>
      <BigCalender data={data} />
    </div>
  )
}

export default BigCalenderContainer;