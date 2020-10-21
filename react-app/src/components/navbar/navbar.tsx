import React from 'react';
import '../../css/header.css';
import { Link } from 'react-router-dom';
import { meals } from '../../interfaces/meals';
import { RootState } from '../../redux/reducers/rootReducer';
import { PopupContainer } from '../authentication/PopupContainer';
import { LoginPopup } from '../authentication/loginPopup';
import { RegistrationPopup } from '../authentication/registrationPopup';
import { userForCreateAccont } from '../../interfaces/authentication';
import { useDispatch, useSelector } from 'react-redux';
import { create_account, logIn, verifyMail } from '../../redux/actions/authentication';

interface NavBarProps {
  cart_length: meals[]
}

export const NavBar: React.FC<NavBarProps> = ({ cart_length }) => {

  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [popuBody, setPopupBody] = React.useState<any>(null);//найти тип для html el
  const [isLogin, setisLogin] = React.useState<boolean>(true);
  const dispatch = useDispatch();
  const handleAuthOpen = () => {
    setIsPopupOpen(true);
    setisLogin(true);
    setPopupBody(
      <LoginPopup
        registrationHeandler={registrationHeandler}
        verifyMail = {(mail:string)=>dispatch(verifyMail(mail))}
        logIn={(data)=>dispatch(logIn(data))}
      />);
  };

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  //убрать это от сюда СРОЧНО!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const createAccount = (user: userForCreateAccont) => {
    dispatch(create_account(user));
  };
  const registrationHeandler = () => {
    setIsPopupOpen(true);
    setisLogin(false);
    setPopupBody(<RegistrationPopup handleAuthOpen={handleAuthOpen} createAccount={createAccount}/>);
  };

  const count = (): Number => {
    let num = cart_length.reduce((sum, current) => (
      sum + current.count
    ), 0);

    return num;
  };
  return (
    <>
      <PopupContainer isOpen={isPopupOpen} onClose={handleClose} isLogin={isLogin}>{popuBody}</PopupContainer>
      <div className="App__header ">
        <div className="App_header__main">
          <nav className="navbar navbar-light">
            <div className="container-fluid App_header__main-container ">
              <Link to={`/HomePage`}>
                      <span className="navbar-brand  App_header__main-Header">
                          <img src="http://localhost:3000/assets/leaf.svg" width="30" height="30" alt="" loading="lazy"/>
                          Delivary
                      </span>
              </Link>
              <span className="Partnership">Partnership</span>
              <div className="button-controller">
                <button type="button" onClick={handleAuthOpen} className="btn btn-outline-info App_header__main-button">LogIn</button>
                <Link to={'/cart'}>
                  <button type="button" className="btn btn-warning App_header__secondary-button">
                    Cart
                    <span className="App_header__secondary-cart">
                          {count()}
                          </span>
                  </button>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
