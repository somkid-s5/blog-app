import axios from "axios";
import Link from "next/link";
import React from "react";

interface Category_Type {
  id: string;
  slug: string;
  title: string;
}

const getData = async (): Promise<Category_Type[]> => {
  console.log(process.env.NEXT_PUBLIC_URL + "api/categories");
  try {
    const res = await axios.get<Category_Type[]>(
      process.env.NEXT_PUBLIC_URL + "api/categories",
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    if (res.status !== 200) {
      throw new Error("Failed");
    }

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

const CategoryList = async () => {
  const data = await getData();
  return (
    <div className=" flex flex-wrap gap-4 ">
      {data?.map((item) => (
        <Link
          href={`/tag/${item.slug}`}
          key={item.id}
          className="btn-tag"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
