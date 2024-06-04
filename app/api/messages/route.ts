import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const {message, image, conversationId} = await req.json();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", {status : 401});
    }

    const newMessage = await prisma.message.create({
        data: {
            body : message,
            image : image,
            conversation : {
                connect : {
                    id : conversationId
                }
            },
            sender : {
                connect : {
                    id : currentUser.id
                }
            },
            seen : {
                connect : {
                    id : currentUser.id
                }
            },
        },
        include : {
            sender : true,
            seen : true
        },
    });

    const updatedConversation = await prisma.conversation.update({
        where: {
            id : conversationId
        },
        data : {
            lastMessageAt : new Date(),
            messages : {
                connect : {
                    id : newMessage.id
                }
            }
        },
        include : {
            users : true,
            messages : {
                include : {
                    seen : true
                }
            }
        }
    });

    return NextResponse.json(newMessage, {status : 201});
  } catch (error) {
    console.log(error, "ERROR MESSAGE")
    return new NextResponse("Internal Server Error", {status : 500});
  }
}