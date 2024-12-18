'use client';

import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface GroupChatModalProps {
    isOpen : boolean;
    onClose : ()=>void;
    users : User[];
}
const GroupChatModal : React.FC<GroupChatModalProps> = ({ isOpen, onClose, users}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, setValue, watch, formState :{
        errors
    } } = useForm<FieldValues>({
        defaultValues :{
            name : '',
            members : []
        }
    });
    const members = watch('members');
    const onSubmit:SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true);
        axios.post('/api/conversations', {...data, isGroup : true})
        .then(()=>{
            router.refresh();
            onClose();
        })
        .catch((err)=>{ toast.error(err.response.data.message) })
        .finally(()=>{ setIsLoading(false) });
    }

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Create Group
                    </h2>
                    <p className="text-sm leading-6 text-gray-700 mt-1">
                        Create a chat with more than 2 people
                    </p>
                    <div className="mt-10 flex flex-col gap-y-8">
                        <Input disabled={isLoading} errors={errors} label="Name" id="name" register={register} required />
                        <Select disabled={isLoading} label="Members" options={users.map((user)=>({label : user.name, value : user.id}))}
                            onChange={(value)=>{setValue("members", value, {
                                shouldValidate : true
                            })}} value={members} />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-3">
                    <Button disabled={isLoading} secondary onClick={onClose} type="button">
                        Cancel
                    </Button>
                    <Button disabled={isLoading} type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default GroupChatModal;