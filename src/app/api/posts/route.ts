import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse, NextRequest } from "next/server";

// GET A POST
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const cat = searchParams.get("cat");

  const POST_PER_PAGE = 10;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { category: cat }),
    },
    orderBy: {
      createdAt: "desc" as const,
    },
    include: {
      user: true,
      cat: true,
    },
  };

  try {
    const posts = await prisma.post.findMany(query);

    const postCount = posts.length;
    return new NextResponse(JSON.stringify({ posts, postCount }), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

export default GET;

// CREATE A POST
export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
      status: 401,
    });
  }

  const body = await req.json();
  if (!body.image || !body.title || !body.category || !body.content) {
    return new NextResponse(
      JSON.stringify({ message: "Please provide all required fields" }),
      { status: 400 }
    );
  }
  const slug = body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  console.log({
    data: { ...body, slug, userEmail: session.user.email },
  });
  try {
    const post = await prisma.post.create({
      data: { ...body, slug, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    return console.log(err);
    // return new NextResponse(
    //   JSON.stringify({ message: "Something went wrong!" }),
    //   { status: 500 }
    // );
  }
};
