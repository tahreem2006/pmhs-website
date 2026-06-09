import React from 'react';
import Image from "next/image";

const SchoolBanner = () => {
  return (
 
    <div className="flex items-center justify-between w-[95%] max-w-4xl mx-auto mt-12 mb-10 px-4 py-6 md:px-8 bg-white rounded-2xl shadow-lg border border-amber-300 font-rancho">
      
     
      <Image 
        src="/logo.png"
        alt="School Logo"
        
        width={96} 
        height={96}
        className="w-16 h-16 md:w-24 md:h-24 object-contain shrink-0"
      />

      
      <div className="flex flex-col items-center text-center flex-1 px-2">
     
        <h1 className="text-xl md:text-3xl font-bold text-gray-900 tracking-wide">
          PATNA MUSLIM HIGH SCHOOL
        </h1>

        <h3 className="text-lg md:text-xl font-bold mt-2">
          <span className="text-red-600">"Ilm, </span>
          <span className="text-blue-600">Ikhlaq,</span>
          <span className="text-green-600"> Ibtikar"</span>
        </h3>

        <h3 className="text-sm md:text-lg font-medium text-gray-700 mt-1">
          <span className="text-red-500">"Knowledge, </span>
          <span className="text-blue-500">Character,</span>
          <span className="text-green-500"> Innovation"</span>
        </h3>
      </div>

   
      <Image 
        src="/grad-icon.webp"
        alt="Graduation Icon"
        width={96} 
        height={96}
        className="w-16 h-16 md:w-24 md:h-24 object-contain shrink-0"
      />
    </div>
  );
};

export default SchoolBanner;