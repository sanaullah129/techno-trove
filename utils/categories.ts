import { RiStore3Line } from "react-icons/ri";
import { ImMobile } from "react-icons/im";
import { BiLaptop } from "react-icons/bi"
import { IoWatch } from "react-icons/io5";
import { MdTv } from "react-icons/md";
import { MdKeyboardHide } from "react-icons/md";
import { SlScreenDesktop } from "react-icons/sl";

export const Categories = [
    {
        label: 'All',
        icon: RiStore3Line
    },
    {
        label: 'Phone',
        icon: ImMobile
    },
    {
        label: 'Laptop',
        icon: BiLaptop
    },
    {
        label: 'Desktops',
        icon: SlScreenDesktop
    },
    {
        label: 'Watch',
        icon: IoWatch
    },
    {
        label: 'TV',
        icon: MdTv
    },
    {
        label: 'Accessories',
        icon: MdKeyboardHide
    }
];