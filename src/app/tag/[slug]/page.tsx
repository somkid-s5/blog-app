import CategoryList from "@/components/Category-List";
import React from "react";
import PostsList from "@/components/Posts-Recent";
import { useRouter } from "next/router";
import PostCard from "@/components/Post-Card";

interface TypeSlug {
  slug: string;
}
interface Typepage {
  page: string;
}
interface resType {
  posts: any[];
  count: number;
}

const getData = async (cat: string): Promise<resType> => {
  const res = await fetch(`http://localhost:3000/api/posts?&cat=${cat}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const TagPage = async ({ params }: { params: TypeSlug }) => {
  const { slug } = params;
  const { posts } = await getData(slug);

  return (
    <div className="grid my-5 gap-5 p-5">
      <div className="grid gap-5  justify-center text-center">
        <CategoryList />
        <h1 className="text-4xl font-bold">{posts[1].cat.title}</h1>
      </div>
      <div className="grid gap-5">
        <h1 className="text-xl font-bold">Recent Post</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-5 ">
          {posts?.map((item: any) => (
            <PostCard item={item} key={item._id} style={"grid"} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagPage;
