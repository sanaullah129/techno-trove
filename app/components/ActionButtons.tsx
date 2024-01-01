import React from 'react';
import { IconType } from 'react-icons';

interface ActionButtonsProps {
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ icon: Icon, onClick, disabled }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onClick(e);
    }
  };

  return (
    <button
      disabled={disabled}
      className={`flex items-center justify-center rounded cursor-pointer w-[40px] h-[30px]
            ${disabled && 'opacity-50 cursor-not-allowed'} text-slate-700 border border-slate-400`}
      onClick={handleClick}
    >
      <Icon size={18} />
    </button>
  );
};

export default ActionButtons;