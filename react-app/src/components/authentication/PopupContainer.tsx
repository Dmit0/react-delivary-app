import React, { useEffect } from 'react';
import "../../css/authenticationStyles.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchGeoModel } from '../../interfaces/geo';
import { RootState } from '../../redux/reducers/rootReducer';


interface PopupProps{
    isOpen:boolean
    isLogin:boolean
    onClose(isClose: boolean): void
}

export const PopupContainer: React.FC<PopupProps> = ({ isOpen, onClose, children, isLogin }) => {
    const { isClose } = useSelector((state: RootState) => {
        return {
            isClose: state.authentication.isPopupClose,
        };
    });
    useEffect(() => {
        if (isClose) {
            onClose(isClose);
        }
    }, [ isClose ]);
    return (
      <>
          { isOpen
            ? <>
                <div className="authWrapper" onClick={() => onClose(false) }></div>
                { isLogin
                  ? <div className="authPopup">{ children }</div>
                  : <div className="registrationPopup">{ children }</div>
                }
            </>
            : null }
      </>
    );
};