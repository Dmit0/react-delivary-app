import React from 'react';
import '../../css/authenticationStyles.css';

interface PopupProps {
  isOpen: boolean
  isLogin: boolean

  onClose(): void
}

export const PopupContainer: React.FC<PopupProps> = ({ isOpen, onClose, children, isLogin }) => {
  return (
    <>
      {isOpen
        ? <>
          <div className="authWrapper" onClick={onClose}></div>
          {isLogin
            ? <div className="authPopup">{children}</div>
            : <div className="registrationPopup">{children}</div>
          }
        </>
        : null}
    </>
  );
};