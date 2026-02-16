"use client";
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

export default Navbar;
