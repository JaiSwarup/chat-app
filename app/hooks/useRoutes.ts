import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react"; 
import { HiChat } from "react-icons/hi";
import { HiUsers, HiArrowLeftOnRectangle } from "react-icons/hi2";
import useConversation from "./useConversation";
import {signOut} from "next-auth/react";

const useRoutes = () => {
    const pathname = usePathname();
    const {conversationId} = useConversation();
    
    const routes = useMemo(()=>[
        {
            label : "Chat",
            href : "/conversations",
            icon : HiChat,
            active : pathname === "/conversations" || !!conversationId
        },
        {
            label : "Users",
            href : "/users",
            icon : HiUsers,
            active : pathname === "/users"
        },
        {
            label : "Logout",
            href : "#",
            icon : HiArrowLeftOnRectangle,
            onClick : ()=> signOut()
        }
    ], [pathname, conversationId]);
    return routes;
}

export default useRoutes;