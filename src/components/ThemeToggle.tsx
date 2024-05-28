"use client";

import { useState, useEffect, FC } from "react";
import { useTheme } from "next-themes";

const ThemeToggle:FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { setTheme, resolvedTheme } = useTheme();

  const toggle = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
  }, [resolvedTheme]);

  if (mounted)
    return (
      <div
        className=" w-11 h-6 rounded-xl  cursor-pointer flex items-center    gap-[2px]  relative  justify-between  bg-black dark:bg-white   "
        onClick={toggle}
      >
        
        <i className="fi fi-sr-moon-stars text-xs leading-[0] ml-1 text-[#f9be49] "></i>
        <div
          className={
            " w-[15px] h-[15px]  rounded-[50%] absolute duration-300 border-none  bg-white dark:bg-black " +
            (resolvedTheme === "light"
              ? " translate-x-[26px]  "
              : " translate-x-1 ")
          }
        ></div>
        
        <i className="fi fi-sr-brightness text-xs leading-[0] mr-1 text-[#f9be49]"></i>
      </div>
    );
};

export default ThemeToggle;
