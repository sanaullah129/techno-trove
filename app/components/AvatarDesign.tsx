import React from "react";
import Image from 'next/image';
import { FaUserCircle } from "react-icons/fa";

interface AvatarDesignProps {
    src?: string | null | undefined
}

const AvatarDesign: React.FC<AvatarDesignProps> = ({ src }) => {
    if (src) {
        return (<Image src={src} height={30} width={30} alt="Avatar" className="rounded-full" />
        )

    }
    return (
        <FaUserCircle size={24} />
    )

}

export default AvatarDesign