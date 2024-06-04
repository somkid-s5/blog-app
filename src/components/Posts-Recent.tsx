import React from "react";
import dynamic from 'next/dynamic'
const PostCard = dynamic(() => import('./Post-Card'))
// import PostCard from "./Post-Card";
import Pagination from "./Pagination";

interface pageProps {
  page: number;
  tag?: string | null;
}

interface resType {
  posts: any[];
  postCount: number;
}

const getData = async (page: number, cat?: string | null): Promise<resType> => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_URL + `/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const PostsList: React.FC<pageProps> = async ({ page, tag }) => {
  const { posts, postCount } = await getData(page, tag);
  const POST_PER_PAGE = 10;

  const hasPrev = page - 1 > 0;
  const hasNext = POST_PER_PAGE <= postCount;
  return (
    <main className="flex flex-col gap-5  flex-[2]">
      <h1 className="text-xl font-bold">Recent Posts</h1>
      <div className=" flex  flex-wrap gap-5 justify-center lg:justify-start">
        {posts?.map((item: any) => (
          <PostCard item={item} key={item._id} style={"flex"} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </main>
  );
};

export default PostsList;
