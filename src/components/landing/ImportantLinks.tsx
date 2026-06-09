import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faBullhorn,faArrowRight } from '@fortawesome/free-solid-svg-icons'
 
import '@fortawesome/fontawesome-svg-core/styles.css';
 
import { config } from '@fortawesome/fontawesome-svg-core';
 
config.autoAddCss = false; 
//to avoid adding its own css

 
const Notices = () => {
    // 1. We put the links in an array to keep the code clean!
    const importantLinks = [
      {
        title: "BSEB Official Website",
        desc: "Portal for news, notifications, and updates.",
        url: "https://biharboardonline.bihar.gov.in/",
      },
      {
        title: "Circulars & Notices",
        desc: "Official board circulars for students and schools.",
        url: "https://biharboardonline.com/",
      },
      {
        title: "Date Sheet / Time-Table",
        desc: "Download exam schedule for 10th & 12th.",
        url: "https://biharboardonline.bihar.gov.in/",
      },
      {
        title: "Admit Card",
        desc: "Download Matric & Intermediate admit cards.",
        url: "https://biharboardonline.bihar.gov.in/",
      },
      {
        title: "Results",
        desc: "Check 10th & 12th results online.",
        url: "https://result.biharboardonline.org/",
      },
      {
        title: "Class 10 Syllabus",
        desc: "Download official syllabus for Class 10.",
        url: "https://biharboardonline.com/files/CLASS_10_SYLLABUS%20.pdf",
      },
      {
        title: "Class 12 Syllabus",
        desc: "View syllabus for Class 12 exams.",
        url: "https://biharboardonline.bihar.gov.in/",
      },
    ];

   return(
    <section className="w-full max-h-[650px] max-w-7xl mx-auto px-4 ">
        <div className="bg-[#FCFCF9] rounded-2xl shadow-xl  p-6  flex flex-col h-[500px] md:h-[600px]">
        <h2 className="font-bold text-xl pb-4"> <FontAwesomeIcon icon={faLink} /> Important Links</h2>
        <div className="flex-1   overflow-scroll pr-4 space-y-4  ">
          {importantLinks.map((link, index) => (
            <div 
              key={index} 
              className="group   p-5 rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all duration-300"
            >
              <h4 className="font-bold text-[#003366] text-lg mb-1">
                {link.title}
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                {link.desc}
              </p>
              <a 
                href={link.url} 
                target="_blank" //open the link in new tab
                rel="noreferrer"//stop new webiste from knowing where user came from
                className="inline-flex items-center text-sm font-semibold text-amber-600 hover:text-[#003366] group-hover:text-base transition-colors"
              >
                Visit Link 
             
                <FontAwesomeIcon 
                  icon={faArrowRight} 
                  className="ml-2 group-hover:translate-x-2 transition-transform duration-300" 
                />
              </a>
            </div>
          ))}
        </div>
        </div>
    </section>
   )

}
export default Notices