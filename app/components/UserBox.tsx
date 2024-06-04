'use client';

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import Avatar from "./Avatar";

interface UserBoxProps {
    data : User;
}
const UserBox : React.FC<UserBoxProps> = ({data}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);
        axios.post("api/conversations", {
            userId : data.id
        })
        .then((response)=>{
            router.push(`/conversations/${response.data.id}`);
        })
        .finally(()=>{
            setIsLoading(false);
        });
    }, [data, router]);
    return (
        <div onClick={handleClick} 
        className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 transition cursor-pointer rounded-lg">
            <Avatar user={data} />
        </div>
    );
};

export default UserBox;