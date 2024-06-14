'use client';

import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useConversation from "@/app/hooks/useConversation";
import { MdOutlineGroupAdd } from "react-icons/md";
import clsx from "clsx";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { User } from "@prisma/client";

interface ConversationListProps {
    initialItems : FullConversationType[];
    users : User[];
}
const ConversationList : React.FC<ConversationListProps> = ({initialItems, users}) => {
    const {isOpen, conversationId} = useConversation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState(initialItems);
    const router = useRouter();
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