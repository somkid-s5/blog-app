import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import ThemeToggle from "./ThemeToggle";
import AuthLinks from "./AuthLinks";

const Navbar: FC = () => {
  return (
    <header className="flex justify-between w-full items-center  px-[5vw]  py-5 h-[80px] border-b border-grey  z-10 sticky top-0 backdrop-blur-sm dark:bg-[#222222]/90 bg-[#f7f7f7]/90  ">
      <Link href="/" className="flex-1">
        <div className="   font-bold text-2xl">BLOG & BLOG</div>
      </Link>
      <nav className=" hidden  md:flex flex-1 justify-center gap-10 ">
        <Link href="/" className="link">
          Home
        </Link>
      </nav>
      <div className="flex-1 flex items-center  justify-end gap-4">
        <ThemeToggle />
        <AuthLinks />
      </div>
    </header>
  );
};

export default Navbar;
