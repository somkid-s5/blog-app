"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface AuthFormState {
  name: string;
  email: string;
  password: string;
}

const UserAuthForm = ({ params }: { params: { slug: string } }) => {
  const [formData, setFormData] = useState<AuthFormState>({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  if (params.slug !== "sign-in" && params.slug !== "sign-up") {
    return <div className="">Invalid params: {params.slug}</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serverRoute: string =
      params.slug === "sign-in" ? "/signin" : "/signup";

    // regex email && password
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    //formValidation
    if (formData.name && formData.name.length < 3) {
      return toast.error("fullName must be at least 3 letters long");
    }

    if (!formData.email.length) {
      return toast.error("Enter Email");
    }
    if (!emailRegex.test(formData.email)) {
      return toast.error("Email is invalid");
    }
    if (!passwordRegex.test(formData.password)) {
      return toast.error(
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters"
      );
    }

    userAuthThroughServer(serverRoute);
  };

  const userAuthThroughServer = async (serverRoute: string) => {
    if (serverRoute === "/signin") {
      let loadingToast = toast.loading("loading...");
      try {
        const result = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });
        toast.dismiss(loadingToast);
        if (result?.error) {
          toast.error(result.error);
        } else {
          router.push("/write");
        }
      } catch (error) {
        toast.error((error as Error).message);
      }
    } else {
      let loadingToast = toast.loading("loading...");
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_URL + "api/auth/signup",
          formData
        );
        toast.dismiss(loadingToast);
        toast.success("👍" + response.data.message);
        router.push("/userAuth/sign-in");
      } catch (error) {
        toast.dismiss(loadingToast);
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message);
        } else {
          console.error(error);
        }
      }
    }
  };

  return (
    <section className="h-cover  flex items-center justify-center">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="w-[80%] max-w-[400px]  grid justify-center "
      >
        <h1 className="text-4xl font-gelasio capitalize text-center mb-10">
          {params.slug === "sign-in" ? "Welcome back" : "Join us today"}
        </h1>
        {params.slug === "sign-up" ? (
          <div className="relative w-full mb-4">
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              placeholder="Full name"
              className="w-full rounded-md p-4 bg-gray-100 pl-12 border border-grey focus:bg-transparent placeholder:text-black"
              onChange={handleChange}
            />
            <i className="fi fi-rr-user absolute left-4 top-1/2 -translate-y-1/2"></i>
          </div>
        ) : (
          ""
        )}
        <div className="relative w-full mb-4">
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            placeholder="Email"
            className="w-full rounded-md p-4 bg-gray-100 pl-12 border border-grey focus:bg-transparent placeholder:text-black"
            onChange={handleChange}
          />
          <i className="fi fi-rr-envelope absolute left-4 top-1/2 -translate-y-1/2"></i>
        </div>
        <div className="relative w-full mb-4">
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            placeholder="Password"
            className="w-full rounded-md p-4 bg-gray-100 pl-12 border border-grey focus:bg-transparent placeholder:text-black"
            onChange={handleChange}
          />
          <i className="fi fi-rr-key absolute left-4 top-1/2 -translate-y-1/2"></i>
        </div>
        <button className="btn-dark  mt-8" type="submit">
          {params.slug.replace("-", " ")}
        </button>

        <div className=" relative w-full flex items-center gap-2 my-8 opacity-10 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>or</p>
          <hr className="w-1/2 border-black" />
        </div>

        <button
          type="button"
          onClick={() => signIn("google")}
          className="btn-dark flex items-center gap-5 justify-center w-[90%] mx-auto"
        >
          <Image
            src="/google.png"
            width={50}
            height={50}
            alt="Icon Google"
            className="w-5"
          />
          continue with google
        </button>
        {params.slug === "sign-in" ? (
          <p className="mt-6 text-dark-grey text-xl text-center">
            Don&#39;t have a account
            <Link href="./sign-up" className="underline  text-xl ml-1">
              Join us to day
            </Link>
          </p>
        ) : (
          <p className="mt-6 text-dark-grey text-xl text-center">
            Already a member ?
            <Link href="./sign-in" className="underline  text-xl ml-1">
              Sign in here.
            </Link>
          </p>
        )}
      </form>
    </section>
  );
};

export default UserAuthForm;
