"use client";
import React, { useRef, useState, useEffect } from 'react';
import { FaBell } from "react-icons/fa6"; 
import DetailsModal from "../DetailsModal";
import NoticesForm from "../forms/NoticesForm";
import FormModal from "../FormModal";

interface AnnouncementItem {
  id: string | number;
  title: string;
  date: string;
  description: string;
}

interface AnnouncementScrollProps {
  announcements?: AnnouncementItem[]; 
  role: string | undefined;
  relatedData?: { classes?: { id: string; name: string }[] } | any;
}

const AnnouncementScroll = ({ announcements = [], role, relatedData }: AnnouncementScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selected, setSelected] = useState<AnnouncementItem | null>(null);

  // editing holds the announcement data; open controls the boolean setter passed to NoticesForm
  const [editing, setEditing] = useState<AnnouncementItem | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  // When `open` becomes false -> ensure editing is cleared
  useEffect(() => {
    if (!open) {
      setEditing(null);
    }
  }, [open]);

  // Duplicating array for infinite scroll effect
  const displayAnnouncements = [...announcements, ...announcements];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isHovered || announcements.length <= 3) return;

    let animationFrameId: number;
    const smoothScroll = () => {
      const halfHeight = scrollContainer.scrollHeight / 2;
      if (scrollContainer.scrollTop >= halfHeight) {
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
             
            <FormModal  table="announcements" type="create"  relatedData={relatedData ?? { classes: [] }} />

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
              onClick={() => setSelected(anc)} // open preview on click
            >
