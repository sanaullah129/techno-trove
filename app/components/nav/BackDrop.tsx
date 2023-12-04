import React from "react";

interface BackDorpProps{
    onClick: ()=>void;
};

const BackDrop:React.FC<BackDorpProps> = ({onClick}) => {
  return (
    <div className="z-20 bg-slate-200 opacity-50 w-screen h-screen fixed top-0 left-0">
        
    </div>
  )
}

export default BackDrop