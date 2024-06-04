import { FC } from "react";
import PostsPopList from "./Posts-Popular";
import CategoryList from "./Category-List";

interface resType {
  posts: any;
}

const getData = async (): Promise<resType> => {
  const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/posts/popular", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const SideMenu = async () => {
  const { posts } = await getData();
  return (
    <aside className="hidden  lg:flex flex-col flex-1 gap-5">
      <div>
        <div>
          <p className=" font-light text-gray-500">What&#39;s hot</p>
          <h1 className="text-xl font-bold">Most Popular</h1>
        </div>
        <div className="grid gap-5">
          {posts?.map((item: any) => (
            <PostsPopList item={item} key={item._id} />
          ))}
        </div>
      </div>
      <div className="grid gap-5">
        <div className=" grid">
          <p className=" font-light text-gray-500">Discover by topic</p>
          <h1 className="text-xl font-bold">Categories</h1>
        </div>
        <CategoryList />
      </div>
    </aside>
  );
};

export default SideMenu;
