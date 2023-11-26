"use client";

import { useState } from "react";
import HeadingDesign from "../components/HeadingDesign";
import InputDesign from "../components/inputFields/InputDesign";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import ButtonDesign from "../components/ButtonDesign";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

const RegisterForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: { name: "", email: "", password: "" },
    }); //calling rect-form-hooks(read docs)

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        console.log(data);

    }

    return (
        <>
            <HeadingDesign title="Sign Up for Techno Trave Account" />
            <ButtonDesign label="Sign up with Google" outline icon={AiOutlineGoogle} onClick={() => { }} />
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