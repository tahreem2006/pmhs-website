"use client"
import Image from "next/image"

const events = [
    // Monday Events
    {
      name: 'Morning Assembly',
      time: '8:30 AM - 9:00 AM',
      date: '2026-05-04',
      description: 'All students gather in the main courtyard for daily prayers and principal announcements.',
    },
    {
      name: '12th Science - Physics',
      time: '9:00 AM - 10:30 AM',
      date: '2026-05-04',
      description: 'Chapter 4: Electromagnetic Induction. Students must bring their lab manuals.',
    },
    {
      name: 'Staff Meeting',
      time: '2:00 PM - 3:00 PM',
      date: '2026-05-04',
      description: 'Weekly sync to discuss the upcoming sports day logistics and midterm grading.',
    },
  
    // Tuesday Events
    {
      name: '10th Grade - Mathematics',
      time: '10:00 AM - 11:30 AM',
      date: '2026-05-05',
      description: 'Introduction to Trigonometry. Assignment 3 will be collected.',
    },
    {
      name: 'Lunch Break',
      time: '12:00 PM - 1:00 PM',
      date: '2026-05-05',
      description: 'Standard lunch break for all grades. Cafeteria serving special meals today.',
    },
  
    // Wednesday Events
    {
      name: '12th Commerce - Accounts',
      time: '9:00 AM - 10:30 AM',
      date: '2026-05-06',
      description: 'Balance sheet finalization practice. Group project kickoff.',
    },
    {
      name: 'Guest Lecture: Career Guidance',
      time: '11:00 AM - 1:00 PM',
      date: '2026-05-06',
      description: 'Alumni visiting to speak about engineering and medical entrance exams.',
    },
  
    // Thursday Events
    {
      name: '12th Arts - History',
      time: '9:00 AM - 10:30 AM',
      date: '2026-05-07',
      description: 'Discussion on the Industrial Revolution and its global impacts.',
    },
    {
      name: 'Parent-Teacher Conference',
      time: '2:00 PM - 5:00 PM',
      date: '2026-05-07',
      description: 'One-on-one meetings with parents of underperforming students in the main hall.',
    },
  
    // Friday Events
    {
      name: 'Sports Day Rehearsal',
      time: '8:00 AM - 11:00 AM',
      date: '2026-05-08',
      description: 'March past and relay race practice on the main ground. Sports uniform mandatory.',
    },
    {
      name: 'Weekly Wrap-up & Dismissal',
      time: '2:30 PM - 3:00 PM',
      date: '2026-05-08',
      description: 'Final homeroom attendance and early dismissal for the weekend.',
    }
  ];
const EventCalender = () => {
  return (
    <div  className=" m-2">
      
      <div className='flex justify-between'>
        <h1 className='text-lg'>Events</h1>
        <Image src="/moreDark.png" alt="" width={30} height={30}  />
        </div>


        <div className="flex flex-col gap-4 overflow-scroll max-h-[300px] my-4">
            {events.map((evnt)=>(

                    <div className="border-2 border-gray-300  rounded-lg p-2 border-t-4 odd:border-t-pink-600 even:border-t-green-500" key={evnt.name}>

                        <div className="justify-between flex gap-2">
                            <h1 className="text-sm font-bold">{evnt.name}</h1>
                            <span className="text-xs text-gray-300">{evnt.time} | {evnt.date}</span>
                        </div>
                        <div>
                            <span className="mt-4 text-sm text-gray-500">{evnt.description}</span>
                        </div>

                    </div>
            ))}
        </div>

    
    </div>
  )
}

export default EventCalender
