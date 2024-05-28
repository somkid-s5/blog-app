import prisma from "@/utils/connect";
import * as bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

interface UserInputType {
  email: string;
  password: string;
  name: string;
}

export const POST = async (req: Request, res: Response) => {
  try {
    const { email, password, name }: UserInputType = await req.json();
    // Check if user with email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      // Check if the existing user is a Google user
      const existingAccount = await prisma.account.findFirst({
        where: {
          userId: existingUser.id,
          provider: "google",
        },
      });

      if (existingAccount) {
        return Response.json(
          {
            message:
              "Email is associated with a Google account. Please use Google to sign in.",
          },
          { status: 400 }
        );
      }
      return Response.json(
        { message: "Email already in use." },
        { status: 400 }
      );
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        accounts: {
          create: {
            type: "credentials",
            provider: "credentials",
            providerAccountId: email,
          },
        },
      },
    });
    return Response.json({ message: "User created", user }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 500 });
    }
    return Response.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
};
