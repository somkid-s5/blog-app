import Image from "next/image";
import Link from "next/link";
import React from "react";
import moment from "moment";

interface PostCardProps {
  item: any;
  key: string;
  style?: string;
}

const PostCard: React.FC<PostCardProps> = ({ item, key, style }) => {
  return (
    <div
      className="bg-gray-100 dark:bg-[#3c3c3c]   grid  content-between  w-full rounded-xl shadow-lg p-5"
      key={key}
    >
      <div className={" gap-5 w-full items-center border-gray-200   " + style}>
        <div className="w-full  h-28  md:h-40   relative flex-1   ">
          <Image
            src={item.image}
            alt="Image Blog Title"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover  h-full object-center rounded-lg "
            loading="lazy"
            placeholder="blur"
            quality={20}

          />
        </div>
        <article className="flex flex-[2] max-w-xl flex-col items-start justify-between">
          <div className="flex items-center gap-x-4 text-xs">
            <time
              dateTime="2020-03-16"
              className="text-gray-500 dark:text-gray-200"
            >
              {moment(item.createdAt).format("DD/MM/YYYY")}
            </time>
            <Link href={`/tag/${item.cat.slug}`} className="btn-tag">
              {item.cat.title}
            </Link>
          </div>
          <div className="group relative">
            <h3 className="line-clamp-2 mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white">
              <Link href={`/posts/${item.slug}`}>
                <span className="absolute inset-0" />
                {item.title}
              </Link>
            </h3>
            <div
              className="hidden md:line-clamp-3 mt-5  text-sm leading-6 text-gray-600 dark:text-gray-200 "
              dangerouslySetInnerHTML={{
                __html: item.content.replace(/<img[^>]*>/g, ""),
              }}
            ></div>
          </div>
        </article>
      </div>
      <div className="relative mt-5 flex justify-between items-center gap-x-4  h-max ">
        <div className="flex">
          <div className="flex justify-center items-center px-2">
            <Image
              src={item.user.image}
              width={50}
              height={50}
              alt=""
              className="h-8 w-8 rounded-full bg-gray-50"
            />
          </div>
          <div className="text-sm ">
            <p className="font-semibold text-gray-900 dark:text-white">
              <Link href="/">
                <span className="absolute inset-0" />
                {item.user.name}
              </Link>
            </p>
            <p className="text-gray-600 dark:text-gray-200">Co-Founder / CTO</p>
          </div>
        </div>
        <div className="flex items-center gap-1  ">
          <i className="fi fi-br-eye text-center text-gray-500 dark:text-gray-300"></i>
          <p className="text-center text-gray-500 dark:text-gray-300">
            {item.views}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
