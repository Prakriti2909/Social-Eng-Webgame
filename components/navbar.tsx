/* "use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const Navbar: React.FC = () => {

  

  return (

    <section>
        <nav className="relative flex items-center justify-between px-[4%] md:px-[8%] py-6 sticky top-0 bg-trasnparent z-[1002]">
            <ul className="absolute md:left-0
          list-none flex gap-7 bg-black py-3.5 px-8 rounded-[50px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] md:z-50
          max-md:fixed max-md:top-0 max-md:inset-x-0 max-md:w-full max-md:h-[100svh]
          max-md:flex-col max-md:justify-start max-md:items-center max-md:items-center max-md:gap-7 max-md:pt-20 max-md:overflow-y-auto
          max-md:rounded-none max-md:shadow-none max-md:p-0 max-md:z-[1000]
          max-md:transition-transform max-md:duration-300 max-md:ease-in-out
          md:overflow-visible">

                <li className="text-sm md:text-[18px] max-md:text-xl max-md:font-semibold cursor-pointer text-gray-400 hover:text-[#00ff77] transition-colors duration-200"
                >Home</li> 

                <li className="text-sm md:text-[18px] max-md:text-xl max-md:font-semibold cursor-pointer text-gray-400 hover:text-[#00ff77] transition-colors duration-200">Profile</li>

                <li className="text-sm md:text-[18px] max-md:text-xl max-md:font-semibold cursor-pointer text-gray-400 hover:text-[#00ff77] transition-colors duration-200">History</li>

                <li className="text-sm md:text-[18px] max-md:text-xl max-md:font-semibold cursor-pointer text-gray-400 hover:text-[#00ff77] transition-colors duration-200">Competetion</li>

                <li className="text-sm md:text-[18px] max-md:text-xl max-md:font-semibold cursor-pointer text-gray-400 hover:text-[#00ff77] transition-colors duration-200">Discourse</li>
            </ul>
        </nav>

      
    </section>
  
  );
};

export default Navbar; */

import { Shield } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Shield size={22} className="text-red-500" />
          <span className="text-sm font-bold tracking-widest uppercase">
            SocEng
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <Link href="#" className="transition-colors hover:text-white">
            Learn
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            Profile
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            Competetion
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            History
          </Link>
        </div>
      </div>
    </nav>
  );
}
