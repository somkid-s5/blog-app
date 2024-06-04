"use client";

import { useState, FC, useEffect } from "react";
import Link from "next/link";
import { Squash as Hamburger } from "hamburger-react";
import UserNavigationPanel from "./User-nevigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

const AuthLinks: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { status, data: session } = useSession();

  const [userNavPanel, setUserNavPanel] = useState(false);

  const handleUserNavPanel = () => {
    setUserNavPanel((currentVal) => !currentVal);
  };
  const handelBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 100);
  };

  return (
    <>
      {status === "unauthenticated" ? (
        <>
          <div className="  hidden md:flex gap-4">
            <Link href="/userAuth/sign-in" className="btn-light">
              Sign In
            </Link>
            <Link href="/userAuth/sign-up" className="btn-dark">
              Sign Up
            </Link>
          </div>
          <div className="md:hidden ">
            <Hamburger toggled={open} size={30} toggle={setOpen} rounded />
          </div>
        </>
      ) : (
        <div className="flex bg-gray gap-4">
          <Link
            href="/write"
            className=" hidden md:flex gap-1 p-2 items-center"
          >
            <i className="fi fi-rr-file-edit leading-[0]"></i>
            <p>Write</p>
          </Link>
          <div
            className="relative"
            onClick={handleUserNavPanel}
            onBlur={handelBlur}
          >
            <button
              className=" w-12 h-12 mt-1"
              type="button"
              title="Profile button"
            >
              <Image
                width={100}
                height={100}
                src={session?.user.image as string}
                className="w-full h-full   object-cover rounded-full"
                alt=""
              />
            </button>

            {userNavPanel ? <UserNavigationPanel /> : ""}
          </div>
        </div>
      )}

      {open && (
        <div className="fixed left-0 shadow-lg right-0  top-20 p-8 pt-0 bg-white dark:bg-black ">
          <ul className="grid gap-2 ">
            <li className="w-full p-4 rounded-xl bg-gray-200/50 dark:bg-gray-200/20  shadow-md">
              <Link href="/" className="block w-full  text-xl ">
                Home
              </Link>
            </li>
          </ul>
          {status === "unauthenticated" ? (
            <div className="flex mt-5 gap-5">
              <Link href="userAuth/sign-in" className="btn-dark">
                Sign In
              </Link>
              <Link href="userAuth/sign-up" className="btn-light">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex mt-5 gap-5">
              <Link href="/write" className="flex gap-2 p-2 items-center">
                <i className="fi fi-rr-file-edit leading-[0]"></i>
                <p>Write</p>
              </Link>
              <button type="button" className="btn-dark dark:btn-light">
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
