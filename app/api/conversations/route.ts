import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { userId, isGroup, members = [], name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (isGroup && (!members.length || members.length < 2 || !name)) {
      return new NextResponse("Invalid Data", { status: 400 });
    }

    if (isGroup) {
      const newConversion = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      return NextResponse.json(newConversion);
    }

    const existingConversions = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const conversion = existingConversions[0];

    if (conversion) {
      return NextResponse.json(conversion);
    }

    const newConversion = await prisma.conversation.create({
      data: {
        users: {
          connect: [{ id: userId }, { id: currentUser.id }],
        },
      },
      include: {
        users: true,
      },
    });

    return NextResponse.json(newConversion);
  } catch (error: any) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
