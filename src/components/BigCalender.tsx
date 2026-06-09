 "use client";
import Image from "next/image";
import React, { useState } from 'react'; 
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale'; //  Correct syntax

import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const PASTEL_COLORS = [
    '#BDE0FE', // Soft Sky Blue
    '#E1D5E7', // Pastel Lavender
    '#FADADD', // Light Pink
    '#FCF6BD', // Pastel Yellow
    '#C6DBF0', // Dusty Pastel Blue
    '#D5C6E0', // Deep Lavender
    '#FFD6D6', // Blush Pink
    '#FFF0CB', // Warm Pastel Yellow
    '#D4E157', // Light Lime
    '#81C784', // Soft Green
  ];
  const getColorForString = (str) => {
    // Safety check just in case the string is missing
    if (!str) return PASTEL_COLORS[0]; 
  
    // Grab the number values of the first two letters
 // Add up the character values of the ENTIRE string, not just the first two
 let sum = 0;
 for (let i = 0; i < str.length; i++) {
   sum += str.charCodeAt(i);
 }
  
    // Add them up and wrap around the array length
   
    
    return PASTEL_COLORS[sum % PASTEL_COLORS.length];
  };
const eventStyleGetter = (event) => {
    const backgroundColor = getColorForString(event.title);
    

  return {
    style: {
      backgroundColor,
      borderRadius: '6px',
      color: '#374151', // Soft dark grey text for better readability
      border: 'none',
       
      display: 'block',
      fontWeight: '500', // Makes the text look slightly bolder and polished
      padding: '4px 4px' // Adds a tiny bit of breathing room inside the color blocks
    }
  };
};

 

const MyCalendar = ({data}:{data:{title:string,start:Date,end:Date}[]}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('week'); // Left it on Week view so you can see the colors!
  
  const minTime = new Date(2026, 0, 1, 7, 0); 
  const maxTime = new Date(2026, 0, 1, 23, 0);

  return (
    <div className="bg-white p-4 rounded-xl h-full w-full">
      <div className='flex justify-between items-center mb-4'>
        <h1 className="text-lg font-semibold">Routine</h1>
        <Image src="/moreDark.png" alt="Options" width={20} height={20} className="cursor-pointer" />
      </div>
      
      <div className="h-[500px] w-full">
        <Calendar
          localizer={localizer}
          events={data}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}

          date={currentDate}
          view={currentView}
          views={[ 'week']}
          min={minTime}
          max={maxTime}
          eventPropGetter={eventStyleGetter}
          onNavigate={(newDate) => setCurrentDate(newDate)}
          onView={(newView) => setCurrentView(newView)}
        />
      </div>
    </div>
  );
};

export default MyCalendar;