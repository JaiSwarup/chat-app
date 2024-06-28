'use client';

import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useConversation from "@/app/hooks/useConversation";
import { MdOutlineGroupAdd } from "react-icons/md";
import clsx from "clsx";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface ConversationListProps {
    initialItems : FullConversationType[];
    users : User[];
}
const ConversationList : React.FC<ConversationListProps> = ({initialItems, users}) => {
    const {isOpen, conversationId} = useConversation();
    const session = useSession()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState(initialItems);
    const router = useRouter();
    const pusherKey = useMemo(()=>{
        return session.data?.user?.email;
    }, [session?.data?.user?.email]);
    useEffect(()=>{
        if (!pusherKey) return;

        pusherClient.subscribe(pusherKey);

        const newHandler = (conversation: FullConversationType)=>{
            setItems((current)=>{
                if (find(current, {id:conversationId})) return current;
                return [conversation, ...current];
            });
        }
        const updateHandler = (conversation: FullConversationType)=>{
            setItems((current)=>current.map((currentConversation)=>{
                if (currentConversation.id === conversation.id) return {
                    ...currentConversation, messages: conversation.messages
                };
                return currentConversation;
            }));
        }
        const deleteHandler = (conversation: FullConversationType)=>{
            setItems((current)=>{
                return [...current.filter((convo)=>convo.id !== conversation.id)]
            });
            if (conversationId === conversation.id) router.push("/conversations");
        }
        pusherClient.bind("conversation:new",newHandler);
        pusherClient.bind("conversation:update", updateHandler);
        pusherClient.bind("conversation:delete", deleteHandler);

        return ()=>{
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind("conversation:new");
            pusherClient.unbind("conversation:update");
            pusherClient.unbind("conversation:delete");
        }
    }, [pusherKey, conversationId, router])
    return (
        <>
        <GroupChatModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}  users={users} />
        <aside className={
            clsx("fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
                isOpen ? "hidden" : "block w-full left-0"
                )}>
                <div className="px-5">
                    <div className="flex justify-between pt-4 mb-4">
                        <div className="text-2xl font-bold text-gray-900">
                            Messages
                        </div>
                        <div className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition" onClick={()=>{setIsModalOpen(true)}}>
                            <MdOutlineGroupAdd />
                        </div>
                    </div>
                    {items.map((item)=>(
                        <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
                        ))}
                </div>
        </aside>
        </>
    );
};

export default ConversationList;