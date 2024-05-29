import React from "react";
import moment from "moment";
import Link from "next/link";

interface TypeProps {
  item: any;
  key: string;
}

const PostsPopList: React.FC<TypeProps> = ({ item, key }) => {
  return (
    <div
      className="bg-gray-100 dark:bg-[#3c3c3c]    rounded-xl shadow-lg p-5"
      key={key}
    >
      <article className="flex flex-col max-w-xl  gap-3 items-start ">
        <Link href={`/tag/${item.cat.slug}`} className="btn-tag">
          {item.cat.title}
        </Link>

        <Link
          href={`/posts/${item.slug}`}
          className="text-lg font-semibold line-clamp-2 leading-6 text-gray-900 dark:text-white "
        >
          {item.title}
        </Link>

        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2">
            <Link
              href="/"
              className="font-semibold text-gray-500 dark:text-gray-300 text-sm leading-6"
            >
              {item.user.name}
            </Link>
            <span className="text-gray-500">-</span>
            <time
              dateTime="2020-03-16"
              className="text-gray-500 dark:text-gray-300"
            >
              {moment(item.createdAt).format("DD/MM/YYYY")}
            </time>
          </div>
          <div className="flex items-center gap-1 ">
            <i className="fi fi-br-eye text-center text-gray-500 dark:text-gray-300"></i>
            <p className="text-center text-gray-500 dark:text-gray-300">
              {item.views}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostsPopList;
