"use client";

import React, { useEffect, useState } from "react";
import HeadingDesign from "../components/HeadingDesign";
import InputDesign from "../components/inputFields/InputDesign";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import ButtonDesign from "../components/ButtonDesign";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";

interface LoginFormProps{
    currentUser: SafeUser | null
}

const LoginForm: React.FC<LoginFormProps> = ({currentUser}) => {

    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: { email: "", password: "" },
    }); //calling rect-form-hooks(read docs)

    const router = useRouter();
    useEffect(()=>{
        if(currentUser){
            router.push('/');
            router.refresh();
        }
    }, []);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data, redirect: false}).then((callback) => {
                setIsLoading(false);
                if (callback?.ok) {
                    router.push('/');
                    router.refresh();
                    toast.success('Logged In Successfully');
                };
                if (callback?.error) {
                    toast.error(callback.error);
                }
            });
    };

    if(currentUser){
        return <p className="text-center">You are already logged In. Redirecting....</p>
    }

    return (
        <>
            <HeadingDesign title="Log in your Techno Trave Account" />
            <ButtonDesign label="Continue with Google" outline 
                icon={AiOutlineGoogle} 
                onClick={() => {signIn('google')}} />

            <hr className="w-[95%] my-2 border-t border-solid border-[1.2px] border-blue-950" />

            <InputDesign id="email" label="E-mail" disabled={isLoading} register={register} errors={errors} type="email" />
            <InputDesign id="password" label="Password" disabled={isLoading} register={register} errors={errors} type="password" />
            <ButtonDesign label={isLoading ? "Loading" : "Log in"} onClick={handleSubmit(onSubmit)} />
            <p className="text-sm">
                Don&apos;t have an Account?
                <Link href="/register" className="underline">
                    Sign up
                </Link>
            </p>
        </>
    )
}

export default LoginForm