import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const GET = async (req: NextRequest) => {
  const POPULAR_POST_COUNT = 5;

  try {
    const popularPosts = await prisma.post.findMany({
      take: POPULAR_POST_COUNT,
      orderBy: {
        views: "desc",
      },
      include: {
        user: true,
        cat: true,
      },
    });

    return new NextResponse(
      JSON.stringify({ posts: popularPosts, count: POPULAR_POST_COUNT }),
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
