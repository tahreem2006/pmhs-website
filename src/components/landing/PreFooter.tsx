 "use client"
import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FaCopy } from "react-icons/fa6";
import { useState } from "react";

const Prefooter = () => {
    const [copiedItem, setCopiedItem] = useState("");
    const copyToClipboard=(text:string,itemName:string)=>{
        if(navigator.clipboard)
        {
            navigator.clipboard.writeText(text);

        }
        else{
            const  textArea=document.createElement("textarea");
            textArea.value=text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
        }
        setCopiedItem(itemName);
        setTimeout(() => setCopiedItem(""), 2000);
      
    }
    return(
        <section className="relative w-full py-16 md:py-24 overflow-hidden flex flex-col  items-center">
            
            <div className="absolute inset-0 -z-10 ">
            <Image
          src="/pmhs-cbse-mainblock.png"
          alt="School Building Background"
          fill
          className="object-cover object-bottom"  
        />
     {/* When you combine inset-0 with absolute positioning, it tells the element to stretch out and grab all four corners of its parent container, completely filling the space */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/25 to-white"></div>

            </div>
            <div className="bg-[#42426F] text-white w-[90%] md:w-1/2  p-8 rounded-2xl text-center mb-16  ">
        <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-wider flex justify-center items-center gap-3 text-amber-400">
          THOUGHT FOR THE DAY <FontAwesomeIcon icon={faLightbulb} />
        </h3>
        <p className="text-lg md:text-xl font-medium italic text-gray-100">
          "Education is the key to unlocking the world, a passport to freedom."
        </p>


      </div>

      <div className="w-full max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
 
        <div className="lg:col-span-2 bg-black/30  border border-white/20 text-white p-8 rounded-2xl shadow-xl">
          <h2 className="font-bold text-3xl text-amber-400 mb-2">
            Patna Muslim High School
          </h2>
          <p className="text-gray-200 font-medium mb-6">
            Opp to Science College, Patna, Bihar 800004
          </p>
          <p className="text-gray-100 leading-relaxed text-justify text-lg">
            Patna Muslim High School (PMHS) is a significant educational institution in Patna, Bihar, known for catering to the Muslim community's need for modern education, aiming to blend religious and modern learning. It offers CBSE education up to +2 level, focusing on empowering students with English and science skills, reflecting the broader movement for Muslim educational upliftment in India inspired by figures like Sir Syed Ahmed Khan, who sought to modernize Muslim education.
          </p>
        </div>

     
        <div className="lg:col-span-1 bg-black/30   border border-white/20 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between">
          
          <div className="space-y-6">
        
            <div>
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">Email Us</h3>
              <div 
                onClick={() => copyToClipboard("patnamuslimhighschool@gmail.com", "email")}
                className="group flex items-center justify-between   hover:bg-white/30 p-3 rounded-lg cursor-pointer transition-colors border border-white/10"
              >
                <span className="text-sm md:text-base  text-blue-200 break-all">patnamuslimhighschool@gmail.com</span>
                {copiedItem === "email" ? (
                  <span className="text-green-300 text-sm font-bold ml-2">Copied!</span>
                ) : (
                  <FaCopy className="text-gray-200 group-hover:text-amber-400 transition-colors shrink-0 ml-2" />
                )}
              </div>
            </div>

     
            <div>
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">Call Us</h3>
              <div 
                onClick={() => copyToClipboard("+917781090858", "phone")}
                className="group flex items-center justify-between   hover:bg-white/30 p-3 rounded-lg cursor-pointer transition-colors border border-white/10"
              >
                <span className="text-base text-blue-200 tracking-widest">+91 77810 90858</span>
                {copiedItem === "phone" ? (
                  <span className="text-green-300 text-sm font-bold ml-2">Copied!</span>
                ) : (
                  <FaCopy className="text-gray-200 group-hover:text-amber-400 transition-colors shrink-0 ml-2" />
                )}
              </div>
              <p className="text-xs text-gray-300 mt-2 font-medium">
                Shahnawaz Ahmad (Clerk Cum Accountant)
              </p>
            </div>
          </div>

          <a 
            href="mailto:patnamuslimhighschool@gmail.com"
            className="mt-8 block w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-center py-3 px-6 rounded-xl transition-transform hover:-translate-y-1 shadow-lg"
          >
            Mail Us Directly
          </a>

        </div>
        </div>
        </section>
      ) 

   
}
export default Prefooter;
