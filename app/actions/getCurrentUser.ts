import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";
import { get } from "http";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const user = prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
