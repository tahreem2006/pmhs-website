 
import { useUser } from '@clerk/nextjs'
import {useEffect} from "react";
import { useRouter } from 'next/navigation';
import SchoolBanner from '@/components/landing/SchoolBanner';
import PublicHeader from '@/components/landing/PublicHeader';
import ImageCarousel from '@/components/landing/Carousel';
import MissionVision from '@/components/landing/VisionMission';
import ImportantLinks from '@/components/landing/ImportantLinks';
import PrincipalMessage from '@/components/landing/PrincipalMessage';
import PreFooter from '@/components/landing/PreFooter';
import Annoucement from "@/components/AnnoucementBox";
import RoleRedirect from '@/components/RoleRedirect';
import Footer from '@/components/landing/Footer';
 
export default function HomePage() {


  
 

 

   return (
    <div className="flex flex-col items-center">
      <RoleRedirect/>
 
      <SchoolBanner />
      <div className=' w-screen flex flex-col md:flex-row gap-12 md:gap-6 px-10 py-10'>
        <ImageCarousel/>
          <MissionVision/>
      </div>
      <PrincipalMessage/>
      <div className=' w-screen flex flex-col md:flex-row gap-12 md:gap-6 px-10 py-10'>
        <div className='w-[50%]' >
        <ImportantLinks/>
        </div>
        <div className='w-[50%]'>
        <Annoucement/>
        </div>
      </div>
      
    

     
      <PreFooter/>
 
      <div className="main w-full">
       
      </div>
    </div>
  );
}