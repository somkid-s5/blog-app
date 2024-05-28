"use client";

import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";

import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-ayon"), { ssr: false });

const toolbarOptions = [
  [{ size: ["small", false, "large", "huge"] }, { font: [] }], // custom dropdown
  [{ header: 1 }, { header: 2 }, "bold", "italic", "underline", "blockquote"], // toggled buttons

  [
    { list: "ordered" },
    { indent: "-1" },
    { indent: "+1" },
    { align: [] },
    "link",
    "image",
  ],

  ["clean"],
];

interface FormData {
  image: string;
  title: string;
  category: string;
  content: string;
}

const WritePage = () => {
  const { status, data: session } = useSession();
  
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    image: "/blog_banner.png",
    title: "",
    category: "",
    content: "",
  });

  if (status === "unauthenticated") {
    router.push("/");
  }

  const handleUpdloadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      console.log(file);
      if (!file) {
        toast("Please select an image!", {
          icon: "⚠️",
        });
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast("Please select an image with a file size no more than 2MB", {
          icon: "🤷‍♀️",
        });
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      let loadingToast = toast.loading("Uploading...");
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          toast.dismiss(loadingToast);
          toast.error("Image upload failed");
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            toast.dismiss(loadingToast);
            toast.success("Uploaded 👍");
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      toast.error("Image upload failed");
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      return toast.error("🖼️ Please upload an image.");
    }
    if (!formData.title) {
      return toast.error("📝 Please enter a title.");
    }
    if (!formData.category) {
      return toast.error("📂 Please select a category.");
    }
    if (!formData.content) {
      return toast.error("✍️ Please enter the content.");
    }
    try {
      const res = await axios.post("/api/posts", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data;

      if (res.status !== 200) {
        return toast.error(data.message);
      }

      if (res.status === 200) {
        toast.success("Submit success 👍");
        router.push(`/posts/${data.slug}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    status === "authenticated" &&
    session.user && (
      <section className="mx-auto max-w-[900px] w-full   relative">
        <Toaster />
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="relative aspect-video hover:opacity-80 bg-white   border-4 border-grey">
            <label htmlFor="uploadBanner">
              <Image
                src={formData.image}
                alt=""
                fill={true}
                priority={true}
                className="object-cover"
              />

              <input
                type="file"
                id="uploadBanner"
                accept=".png,.jpg,.jpeg"
                hidden
                onChange={handleUpdloadImage}
              />
            </label>
          </div>
          <div className="flex ">
            <input
              type="text"
              placeholder="Blog Title"
              className="text-3xl font-medium w-full  bg-transparent  outline-none  placeholder:opacity-40"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            ></input>
            <select
              title="test"
              className="py-3 px-6  row-start-1 col-start-1 bg-transparent   dark:bg-[#222222] border-none"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="" selected disabled hidden>
                Choose here
              </option>
              <option value="tech">Technology</option>
              <option value="health">Health & Wellness</option>
              <option value="travel">Travel</option>
              <option value="food">Food & Cooking</option>
              <option value="finance">Finance</option>
              <option value="sports">Sports</option>
              <option value="education">Education</option>
              <option value="entertainment">Education</option>
              <option value="fashion">Fashion</option>
            </select>
          </div>

          <hr className="w-full" />

          <div className="flex gap-5   min-h-[500px]  ">
            <ReactQuill
              className="w-full "
              theme="snow"
              placeholder="Write something..."
              modules={{
                toolbar: toolbarOptions,
              }}
              onChange={(value) => {
                setFormData({ ...formData, content: value });
              }}
            />
          </div>
          <hr className="w-full mb-5" />
          <button
            type="submit"
            className="py-3 px-5 border-none bg-[#1a8917] text-white cursor-pointer  rounded-md "
          >
            Publish
          </button>
        </form>
      </section>
    )
  );
};

export default WritePage;
