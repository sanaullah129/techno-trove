'use client';

import { useCallback, useState } from "react";
import AvatarDesign from "../AvatarDesign";
import { AiFillCaretDown, AiFillDownSquare } from "react-icons/ai";
import Link from "next/link";
import MenuItems from "./MenuItems";
import { signOut } from "next-auth/react";

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const togglOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <>
            <div className='relative z-30' >
                <div onClick={togglOpen} className=' p-2 border-[1px] border-black flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700'>
                    <AvatarDesign />
                    <AiFillCaretDown />
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
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
                        <MenuItems onClick={() => {
                            togglOpen();
                            signOut();
                        }} >
                            Log Out
                        </MenuItems>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserMenu