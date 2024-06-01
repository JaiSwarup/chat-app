"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGoogle, BsGithub } from "react-icons/bs";

type Variant = "LOGIN" | "REGISTER";

export default function AuthForm() {
    const [variant, setVariant] = useState<Variant>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);

    const toggleVariant = useCallback(() => {
        setVariant((prev) => prev === "LOGIN" ? "REGISTER" : "LOGIN");
    }, [variant]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            username : "",
            email: "",
            password: "",
        }
    });

    const onSubmit :SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        if (variant === "LOGIN") {
            console.log("Login", data);
        } else {
            console.log("Register", data);
        }
        // setIsLoading(false);
    };
    const socialAction = useCallback((provider: string) => {
        setIsLoading(true);
        try {
            console.log("Social", provider);
        } catch (error){
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === "REGISTER" && <Input id="username" label="Username" register={register} errors={errors} disabled={isLoading} />}
                    <Input id="email" label="Email" register={register} errors={errors} disabled={isLoading} />
                    <Input id="password" label="Password" register={register} errors={errors} disabled={isLoading} />
                    <Button type="submit" disabled={isLoading} fullWidth>
                        {variant === "LOGIN" ? "Sign in" : "Sign up"}
                    </Button>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <AuthSocialButton icon={BsGithub} onClick={()=>{socialAction("github")}} />
                        <AuthSocialButton icon={BsGoogle} onClick={()=>{socialAction("google")}} />
                    </div>
                    <div className="flex gap-2 justify-center text-sm text-gray-600 mt-6 px-2">
                        <div>
                            {variant === "LOGIN" ? "New here?" : "Already have an account?"}
                        </div>
                        <div className="underline cursor-pointer" onClick={toggleVariant}>
                            {variant === "LOGIN" ? "Create an account" : "Sign in"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}