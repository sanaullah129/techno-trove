'use client';

import React, { useCallback, useState } from "react";
import AvatarDesign from "../AvatarDesign";
import { AiFillCaretDown, AiFillDownSquare } from "react-icons/ai";
import Link from "next/link";
import MenuItems from "./MenuItems";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";

interface UserMenuProp {
    currentUser: SafeUser | null;
};

const UserMenu: React.FC<UserMenuProp> = ({ currentUser }) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <>
            <div className='relative z-30' >
                <div onClick={togglOpen} className=' p-2 border-[1px] border-black flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700'>
                    <AvatarDesign src={currentUser?.image} />
                    <AiFillCaretDown />
                </div>
                {isOpen && (
                    <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
                        {currentUser ?
                            <div>
                                <Link href='/orders'>
                                    <MenuItems onClick={togglOpen} >
                                        Your Orders
                                    </MenuItems>
                                </Link>
                                <Link href='/admin'>
                                    <MenuItems onClick={togglOpen} >
                                        Admin Dashbord
                                    </MenuItems>
                                </Link>
                                <hr />
                                <div className="bg-neutral-200">
                                    <MenuItems onClick={() => {
                                        togglOpen();
                                        signOut();
                                    }} >
                                        Log Out
                                    </MenuItems>
                                </div>
                            </div>
                            : <div>
                                <Link href='/login'>
                                    <MenuItems onClick={togglOpen} >
                                        Login
                                    </MenuItems>
                                </Link>
                                <Link href='/register'>
                                    <MenuItems onClick={togglOpen} >
                                        Sign Up
                                    </MenuItems>
                                </Link>
                            </div>
                        }
                    </div>
                )}
            </div>
            {isOpen ? <BackDrop onClick={togglOpen} /> : null}
        </>
    )
}

export default UserMenu