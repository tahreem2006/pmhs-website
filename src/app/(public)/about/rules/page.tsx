import React from "react";
import { 
  FaUserShield, 
  FaClock, 
  FaFileLines, // FIX: Changed from FaFileText to FaFileLines
  FaUsers 
} from "react-icons/fa6";
export const metadata = {
    title: "Rules & Regulations | PMHS",
  };
export default function RulesAndRegulationsPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 font-sans pb-24">
      
 
      <div className="    py-16 px-4  ">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-red-700 tracking-tight mb-4 uppercase">
            Rules & Regulations
          </h1>
           
          <p className="  text-lg max-w-2xl text-gray-600 mx-auto font-medium">
            Code of Conduct and Guidelines designed to maintain discipline, academic excellence, and mutual respect across our campus community.
          </p>
        </div>
      </div>

 
      <div className="max-w-4xl mx-auto px-4 mt-3 space-y-8 relative z-10">
        
     
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 h-full w-1.5 bg-red-600"></div>
          <div className="flex items-start gap-5">
            <div className="p-3 bg-red-50 rounded-xl text-red-600 shrink-0">
              <FaUserShield size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#003366] mb-4 uppercase tracking-wide">General Discipline</h2>
              <ul className="space-y-3 text-slate-600 md:text-base leading-relaxed list-disc pl-4">
                <li>Students must strictly arrive at the school campus before the first bell. Latecomers may be sent back home for safety.</li>
                <li>Possession or usage of cell phones/mobile devices during active class hours is strictly prohibited. Unauthorized devices will be confiscated.</li>
                <li>Bringing reading materials or literature unrelated to the active academic curriculum is completely restricted.</li>
                <li>Any behavior or conduct contrary to the values of institutional discipline will attract immediate disciplinary assessment.</li>
              </ul>
            </div>
          </div>
        </div>

       
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 h-full w-1.5 bg-blue-600"></div>
          <div className="flex items-start gap-5">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shrink-0">
              <FaClock size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#003366] mb-4 uppercase tracking-wide">Attendance & Promotion</h2>
              <ul className="space-y-3 text-slate-600 md:text-base leading-relaxed list-disc pl-4">
                <li>Students maintaining a cumulative attendance record of <strong className="text-slate-800">less than 75%</strong> will not be considered eligible for annual promotion classes.</li>
                <li>Repeated absence without officially sanctioned leave, or continuous unexplained absence for more than 10 consecutive working days, renders the student's name liable to be struck off the active rolls.</li>
                <li>No provision for re-tests or re-examinations will be facilitated under any standard circumstances without prior approval from the Principal.</li>
              </ul>
            </div>
          </div>
        </div>

       
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 h-full w-1.5 bg-amber-500"></div>
          <div className="flex items-start gap-5">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600 shrink-0">
              <FaFileLines size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#003366] mb-4 uppercase tracking-wide">Withdrawal & Dismissal Procedure</h2>
              <ul className="space-y-3 text-slate-600 md:text-base leading-relaxed list-disc pl-4">
                <li>A parent may formally request to withdraw their child from the school. All running institutional financial dues must be settled completely before a Transfer Certificate is generated.</li>
                <li>Prior to the planned withdrawal of a student, a mandatory one-month formal written notice or payment of one month's fee in lieu of notice is strictly required.</li>
                <li>The school administration reserves the clear right to dismiss any student whose diligence, academic progress, or moral character is found consistently unsatisfactory.</li>
                <li>In all events of procedural dispute, the final decision taken by the School Management shall remain completely <strong className="text-slate-800">final and binding</strong>.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 4: Guidelines For Parents */}
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 h-full w-1.5 bg-emerald-600"></div>
          <div className="flex items-start gap-5">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 shrink-0">
              <FaUsers size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#003366] mb-4 uppercase tracking-wide">Guidelines for Parents & Guardians</h2>
              <ul className="space-y-3 text-slate-600 md:text-base leading-relaxed list-disc pl-4">
                <li>Parents are requested to closely guide their children at home, encouraging them to transform into resourceful, responsible members of the household.</li>
                <li>Ensure that your child dedicates an absolute minimum of two hours daily to home studies and assignments.</li>
                <li>Actively collaborate with the school structure to instill a foundational sense of moral character and respect for the dignity of labor.</li>
                <li>Parents and local guardians remain fundamentally responsible for the logistical safety of their children during transit to and from school.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}