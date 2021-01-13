import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartLength } from '../../../core/redux/cart/selectors';
import { getToken, getUserName } from '../../../core/redux/user/selectors';
import { DropMenu } from './dropNavbarMenu';

interface NanBarButtonsProps {
  userPageRedirect(): void
  handleAuthOpen(): void
}

export const NavBarButtons: React.FC<NanBarButtonsProps> = ({ userPageRedirect, handleAuthOpen }) => {
  const cartLength = useSelector(getCartLength);
  const userName = useSelector(getUserName);
  const isAuth = useSelector(getToken)

  return (
    <div className="button-controller">
      { isAuth
        ? <DropMenu/>
        : <button
          type="button"
          onClick={ handleAuthOpen }
          className="btn btn-outline-info App_header__main-button">
          LogIn
        </button>
      }
      <Link to={ '/cart' }>
        <button
          type="button"
          className="btn btn-warning App_header__secondary-button">
          Cart
        <span className="App_header__secondary-cart">{ cartLength }</span>
        </button>
      </Link>
    </div>
  );
};