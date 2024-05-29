import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
// import { useContext } from "react";

const UserNavigationPanel = () => {
  //   const {
  //     userAuth: { username }, setUserAuth
  //   } = useContext(UserContext);

  const { data: session } = useSession();

  return (
    <div className="absolute right-0 z-50">
      <div className="light dark:dark absolute right-0 border border-grey w-60  duration-200">
      {session && <h1 className=" text-gray-500 font-bold px-8 py-4">{session.user.name}</h1>}
        
        <Link href="/write" className="flex gap-2 link md:hidden px-8 py-4">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>

        <Link
          href="/"
          className="text-dark-grey hover:text-black hover:bg-gray-100   px-8 py-4 block"
        >
          Home
        </Link>

        <span className=" absolute border-t border-grey m-auto  w-full "></span>

        <button
          className="text-left hover:text-black hover:bg-gray-100 w-full px-8 py-4"
          type="button"
          onClick={() => signOut()}
        >
          <h1 className="font-bold text-xl mg-1">Sign Out</h1>
        </button>
        
      </div>
    </div>
  );
};

export default UserNavigationPanel;
