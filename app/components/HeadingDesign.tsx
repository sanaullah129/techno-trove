import React from "react"

interface HeadingDesignProps{
    title: string,
    center?: boolean
}

const HeadingDesign: React.FC<HeadingDesignProps> = ({title, center}) => {
  return (
    <div className={center? "text-center" : "text-start" }>
        <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  )
}

export default HeadingDesign