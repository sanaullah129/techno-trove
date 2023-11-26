'use client';
import React from "react"
import { IconType } from "react-icons"

interface ButtonDesignProps{
    label: string,
    disabled?: boolean,
    outline?: boolean,
    small?: boolean,
    custom?: string,
    icon?: IconType,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const ButtonDesign: React.FC<ButtonDesignProps> = (
    {label,
    disabled,
    outline,
    small,
    custom,
    icon: Icon,
    onClick}
) => {
  return (
    <button disabled={disabled} onClick={onClick} className = {
        `disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-md
        hover:opacity-80
        w-full
        flex items-center justify-center gap-2
        text-slate-700
        ${outline? "bg-white" :"bg-slate-700"} ${outline? "text-slate-700" :"text-white"}
        ${small? "text-sm font-light" : "text-md font-semibold" } ${small? "py-1 px-2 border-[1px]" : "py-3 px-4 border-2" }
        ${custom? custom : "" }`} >
        {Icon && <Icon size={24} /> } {label}
    </button>
  )
}

export default ButtonDesign