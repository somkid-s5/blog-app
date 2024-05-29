import prisma from "@/utils/connect";
import { NextResponse, NextRequest } from "next/server";

// GET SINGLE POST
interface Params {
  params: {
    slug: string;
  };
}

export const GET = async (
  req: NextRequest,
  { params }: Params
): Promise<NextResponse> => {
  const slug = params.slug;

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true, cat: true },
    });
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
