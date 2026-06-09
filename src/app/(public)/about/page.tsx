import SchoolBanner from "@/components/landing/SchoolBanner";
import React from "react";
import Image from "next/image";
export const metadata = {
    title: "About us | PMHS",
  };
const About = () => {
  return (
    <div className="relative min-h-screen   font-sans pb-24">
      
   
       
      
     <SchoolBanner/>

  
      <div className="max-w-4xl mx-auto px-4 space-y-12">

 
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-slate-100 relative group transition-transform duration-500 hover:-translate-y-1">
        
          <div className="absolute top-0 left-8 w-16 h-1 bg-amber-400 rounded-b-md"></div>
          
          <div className="flex items-start gap-6">
            <Image src="/quotes.png" alt="quotes" height={52} width={52} className="w-24  shrink-0 mt-2" />
            <div>
              <h2 className="text-2xl font-bold text-[#003366] tracking-wide mb-4 uppercase">Our History</h2>
              <p className="text-slate-600 leading-relaxed text-justify md:text-left md:text-lg">
                Patna Muslim High School was established in 1938 and stands proudly as the first Muslim
                Minority School in the State of Bihar. The school was granted permission by
                the Government of Bihar to start +2 classes in Arts, Science, and Commerce
                for the session 1986–88, vide Letter No. 519 dated 31.10.1986.
                <br /><br />
                The school is owned, founded, and managed by the Managing Committee of
                Patna Muslim High School, B.M. Das Road, Patna–4. It was established
                primarily for the Muslim community and enjoys the Minority Rights
                guaranteed under Articles 25 and 30 of the Constitution of India.
              </p>
            </div>
          </div>
        </div>

      
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-slate-100 relative group transition-transform duration-500 hover:-translate-y-1">
          <div className="absolute top-0 right-8 w-16 h-1 bg-amber-400 rounded-b-md"></div>
          
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#003366] tracking-wide mb-4 uppercase text-right md:text-left">Aim & Objective</h2>
              <p className="text-slate-600 leading-relaxed text-justify md:text-left md:text-lg mb-4">
                <strong className="text-[#003366] font-semibold">
                  The main objective of establishing the school is to provide educational
                  opportunities to the Muslim community so that they may become equal
                  partners in the development and progress of the nation.
                </strong>
              </p>
              <p className="text-slate-600 leading-relaxed text-justify md:text-left md:text-lg">
                The school places special emphasis on co-curricular activities aimed at
                inculcating beneficial knowledge, discipline, good behavior, and proper
                etiquette. Students actively participate in various sports and physical
                activities under the guidance of trained teachers.
              </p>
            </div>
            <Image src="/lamp.png" alt="quotes" height={52} width={52} className="w-24  shrink-0 mt-2" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;