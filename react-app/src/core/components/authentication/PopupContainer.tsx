import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getIsPopupClose } from '../../redux/auth/selectors';
import { RootState } from '../../redux/rootReducer';
import '../../css/authenticationStyles.css';

interface PopupProps {
  isOpen: boolean
  isLogin: boolean
  onClose(isClose: boolean): void
}

export const PopupContainer: React.FC<PopupProps> = ({ isOpen, onClose, children, isLogin }) => {
  const isClose = useSelector(getIsPopupClose);
  useEffect(() => {
    if (isClose) {
      onClose(isClose);
    }
  }, [ isClose, onClose ]);
  return (
    <>
      { isOpen
        ? <>
          <div className="authWrapper" onClick={ () => onClose(false) }></div>
          { isLogin
            ? <div className="authPopup">{ children }</div>
            : <div className="registrationPopup">{ children }</div>
          }
        </>
        : null }
    </>
  );
};