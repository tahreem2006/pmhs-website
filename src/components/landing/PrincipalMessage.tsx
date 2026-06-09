import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

const PrincipalMessage = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-t-8 border-amber-400 flex flex-col md:flex-row relative z-0">
        
         
        <div className="md:w-1/3 bg-[#003366] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden px-4">
          
      
          
          <div className="w-48 h-48   relative rounded-full border-4 border-amber-400 shadow-2xl overflow-hidden mb-6 z-10 bg-white">
            <Image 
              src="/noavatar.jpg" // Make sure dada.jpeg is in your /public folder
              alt="Principal Izhar Yusuf"
              fill
              className="object-cover"
            />
          </div>
          
          <h3 className="text-2xl font-bold text-white tracking-wider z-10">
            IZHAR YUSUF
          </h3>
          <p className="text-amber-400 font-semibold uppercase tracking-widest mt-1 z-10">
            Principal
          </p>
        </div>

         
        <div className="md:w-2/3 p-8 md:p-12 lg:p-16 relative">
 
          <FontAwesomeIcon 
            icon={faQuoteLeft} 
            className="absolute top-6 left-6 text-7xl text-gray-100 -z-10" 
          />
          
          <h2 className="text-xl md:text-2xl font-bold text-[#003366] mb-8 uppercase tracking-wide">
            From the Principal's Desk
          </h2>
          
          
          <div className="text-gray-700   text-md text-justify space-y-3">
            <p>
              Welcome to our school, where education goes beyond textbooks. We foster academic excellence while nurturing health, hygiene, discipline, and ethical values.
            </p>
            <p>
              Co-curricular activities like sports, arts, and clubs help students discover talents, teamwork, and leadership. Our goal is to guide every child toward becoming confident, responsible, and capable citizens. 
            </p>
            <p>
              Together with parents and staff, we strive to create a safe, inspiring, and holistic learning environment.
            </p>
          </div>
          
 
          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="font-bold text-[#003366] text-xl font-rancho">
              Izhar Yusuf
            </p>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
              Patna Muslim High School
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default PrincipalMessage;