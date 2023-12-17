"use client";

import React, { useEffect, useState } from "react";
import HeadingDesign from "../components/HeadingDesign";
import InputDesign from "../components/inputFields/InputDesign";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import ButtonDesign from "../components/ButtonDesign";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface RegisterFormProps {
    currentUser: SafeUser | null
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: { name: "", email: "", password: "" },
    }); //calling rect-form-hooks(read docs)

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data).then(() => {
            toast.success('Account Created');

            signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            })
                .then((callback) => {
                    if (callback?.ok) {
                        router.push('/cart');
                        router.refresh();
                        toast.success('Logged In Successfully');
                    };
                    if (callback?.error) {
                        toast.error(callback.error);
                    }
                })
                .catch(() => toast.error("Something went wrong. Please try again"))
                .finally(() => setIsLoading(false));
        });
    };

    useEffect(() => {
        if (currentUser) {
            router.push('/');
            router.refresh();
        }
    }, []);

    if (currentUser) {
        return <p className="text-center">You are already logged In. Redirecting...</p>
    }

    return (
        <>
            <HeadingDesign title="Sign Up for Techno Trave Account" />
            <ButtonDesign label="Continue with Google" outline 
                icon={AiOutlineGoogle} 
                onClick={() => {signIn('google')}} />
            <hr className="w-[95%] my-2 border-t border-solid border-[1.2px] border-blue-950" />
            <InputDesign id="name" label="Name" disabled={isLoading} register={register} errors={errors} />
            <InputDesign id="email" label="E-mail" disabled={isLoading} register={register} errors={errors} type="email" />
            <InputDesign id="password" label="Password" disabled={isLoading} register={register} errors={errors} type="password" />
            <ButtonDesign label={isLoading ? "Loading" : "Sign Up"} onClick={handleSubmit(onSubmit)} />
            <p className="text-sm">
                Already have an Account?
                <Link href="/login" className="underline">
                    Log in
                </Link>
            </p>
        </>
    )
}

export default RegisterForm