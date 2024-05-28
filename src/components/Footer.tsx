import Link from "next/link";
import React, { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-gray-100  border-t border-t-gray-200  w-full dark:bg-gray-900/50 dark:border-t-gray-500 ">
      <div className="grid ">
        <div className="grid gap-5 text-center justify-center items-center p-5">
          <h1 className="text-2xl font-bold">Project Blog Website</h1>
          <p>NEXT JS, Tailwind Css, TypeScript, MongoDB, Firebase etc.</p>
        </div>
        <hr className="dark:border-gray-500"/>
        <div className="flex  justify-center text-center p-5">
          <p>Copyright © 2021 Developed by Somkid.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
