import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Links } from '../../../core/enums';
import { Core } from '../../../core/enums/core.enum';
import { DropMenuType } from '../../../core/enums/drop-menu.enum';
import { authClose } from '../../../core/redux/auth/actions';
import { set_cart_length } from '../../../core/redux/cart/actions';
import { set_loved_restaurant } from '../../../core/redux/loveRestaurants/actions';
import { cleanUserData } from '../../../core/redux/user/actions';
import { getUserName } from '../../../core/redux/user/selectors';
import { meals } from '../../../core/types';
import { getLocaleStorageItem } from '../../../core/utils/locale-storage.utils';
import { Sorts } from '../../../core/utils/sorts';

interface DropMenu {
}

export const DropMenu: React.FC<DropMenu> = () => {
  const dispatch = useDispatch();
  const userName = useSelector(getUserName);

  const createMenuItem = useCallback((text: string, type: DropMenuType, action?: () => void) => {
    const onClick = () => {
      if (action) {
        action();
      }
    };
    switch (type) {
      case(DropMenuType.USER_PAGE_LINK):
        return (
          <Link to={ Links.USER } key={ text }>
            <li>
              <span className="dropdown-item dropdown-menu-item" onClick={ onClick }>{ text }</span>
            </li>
          </Link>);
      case(DropMenuType.LOG_OUT):
        return (
          <li key={ text }>
            <span  className="dropdown-item dropdown-menu-item" onClick={ onClick }>{ text }</span>
          </li>
        );
    }
  }, []);

  const logOut = () => {
    dispatch(cleanUserData());
    localStorage.removeItem('token');
    const cart = getLocaleStorageItem(Core.Cart, '[]');
    dispatch(set_cart_length(Sorts.getMealCount(cart)));
    const lovedRestaurants = getLocaleStorageItem(Core.Loved, '[]');
    dispatch(set_loved_restaurant(lovedRestaurants));
    dispatch(authClose())
  };

  const menuItems = useMemo(() => {
    const menuItems = [
      createMenuItem('Home Page', DropMenuType.USER_PAGE_LINK),
      createMenuItem('Log Out', DropMenuType.LOG_OUT, logOut),
    ];
    return menuItems;
  }, [createMenuItem, logOut]);

  return (
    <div className="dropdown navbar-brand-menu-switcher">
      <button
        className={`dropdown-toggle btn btn-outline-info App_header__main-button`}
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-expanded="false">
        {userName}
      </button>
      <ul className="dropdown-menu dropdown-menu-items" aria-labelledby="dropdownMenuButton">
        { menuItems.map(item => item) }
      </ul>
    </div>
  );
};