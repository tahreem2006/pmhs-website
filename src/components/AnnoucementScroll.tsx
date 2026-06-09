"use client"
import { useEffect, useRef, useState } from "react"
import { FaBell } from "react-icons/fa6"; 

const EventCalender = ({ announcements = [], role }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
//duplicating arr
  const displayAnnouncements = [...announcements, ...announcements];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    
    
    if (!scrollContainer || isHovered || announcements.length <= 3) return;

    let animationFrameId: number;
    
    const smoothScroll = () => {
       //half height will scroll to top makin it look like infinite scroll
      const halfHeight = scrollContainer.scrollHeight / 2;
  
      if (scrollContainer.scrollTop >= halfHeight) {
        // The Teleport: Snaps back to index 0 instantly and invisibly!
        scrollContainer.scrollTop = 0;
      } else {
        scrollContainer.scrollTop += 0.5; 
      }
      
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, announcements.length]);

  return (
     <div className="relative w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden flex flex-col h-[500px] md:h-[600px]">
      
       <div className="px-6 py-4 bg-amber-100/20 flex justify-between items-center z-10 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <FaBell className="text-amber-400 text-4xl animate-bounce" />
          <h1 className="text-xl font-bold tracking-wide">Notice Board</h1>
        </div>
        {role === "admin" && (
          <button className="text-xs font-bold text-[#42426F] bg-amber-400 px-3 py-1.5 rounded-full hover:bg-amber-300 transition-colors shadow-sm">
            + New Notice
          </button>
        )}
      </div>

      <div className="relative flex-1 bg-slate-50/30 overflow-hidden">
        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex flex-col h-full overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
       
          {displayAnnouncements.map((anc, idx) => (
            <div 
              
              key={`${anc.id}-${idx}`}
              className="group relative p-2 hover:bg-white transition-colors duration-300 cursor-pointer"
            >
              <div className="p-4 rounded-xl border group-hover:shadow-md group-hover:border-amber-400 border-orange-950/15 bg-white">
               
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h2 className="text-base font-bold text-slate-800 group-hover:text-blue-700 transition-colors leading-tight">
                    {anc.title}
                  </h2>
                  <span className="shrink-0 text-[10px] font-bold tracking-wider uppercase bg-blue-100/50 text-blue-700 py-1 px-2.5 rounded-md">
                    {anc.date}
                  </span>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                  {anc.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default EventCalender;