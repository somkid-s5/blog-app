import SideMenu from "@/components/SideMenu";
import axios from "axios";
import { Console } from "console";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getData = async (slug: string) => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_URL + `/api/posts/${slug}`, {
      headers: {
        "Cache-Control": "no-store",
      },
    });

    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

interface Params {
  params: {
    slug: string;
  };
}

const SinglePage: React.FC<Params> = async ({ params }) => {
  const { slug } = params;
  const data = await getData(slug);
  return (
    <main className="px-2  py-8">
      <section className="grid gap-10 justify-center  w-full max-w-screen-lg  mx-auto relative ">
        <div className="grid gap-3 justify-start ">
          <h1 className="text-5xl font-bold ">{data.title}</h1>
          <Link
            href={`/tag/${data.cat.slug}`}
            className="btn-tag"
          >
            {data.cat.title}
          </Link>
          <div className="relative mt-5 flex  items-center gap-x-4">
            <Image
              src={data.user.image}
              width={64}
              height={64}
              alt=""
              className="h-10 w-10 rounded-full bg-gray-50"
              priority={true}
              quality={10}
            />
            <div className="text-sm ">
              <p className="font-semibold text-gray-900 dark:text-gray-200">
                <Link href="/">
                  <span className="absolute inset-0" />
                  {data.user.name}
                </Link>
              </p>
              <p className="text-gray-600 dark:text-gray-300">Co-Founder / CTO</p>
            </div>
          </div>
        </div>
        <hr className="dark:border-gray-500  " />
        <div className="w-full h-96 relative  ">
          <Image
            src={data.image}
            alt=""
            fill
            className="object-cover object-center rounded-lg  "
            placeholder="blur"
            priority={true}
          />
        </div>
        <div
          className="px-4 lg:px-0 mt-12 text-gray-700 dark:text-gray-200 max-w-screen-md mx-auto text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></div>
      </section>
      {/* <section>
        <div></div>
        <div className="flex-1">
        <SideMenu />
      </div>
      </section> */}
    </main>
  );
};

export default SinglePage;
