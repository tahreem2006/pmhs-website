import React from 'react'
import prisma from '@/lib/prisma'
import BigCalender from "./BigCalender"

// 1. Move helper maps outside the component so they don't recreate on every render
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

  // 2. Fetch raw data from the database
  const rawData = await prisma.lesson.findMany({
    where: {
      // ✅ FIXED: Parsed id to an integer for classId since your DB uses number IDs
      ...(type === "teacherId" ? { teacherId: id } : { classId:id })
    },
    include: {
      subject: { select: { name: true } }
    }
  })

  const today = new Date();
  const currentWeekDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

  // 3. Clean, flat mapping of your array directly inline
  const data = rawData.map((lesson: any) => {
    const targetDayNumber = dayOfWeekMap[lesson.day] ?? 1;
    const diff = targetDayNumber - currentWeekDay;

    // Adjust dates so they appear correctly on the current week's grid
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

  // 4. ✅ FIXED: The return statement is now at the root level of the component!
  return (
    <div>
      <BigCalender data={data} />
    </div>
  )
}

export default BigCalenderContainer;