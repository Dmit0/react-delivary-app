import React, { useCallback, useEffect } from 'react';
import './user.style.css'
import '../../../core/css/styles.css';
import '../../../core/css/content.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPaginatedAddresses } from '../../../core/redux/user-page/address-module/actions/address-module.actions';
import { ADDRESSES_PER_PAGE } from '../../../core/redux/user-page/types';
import { getUser } from '../../../core/redux/user/actions';
import { getIsLogIn, getUser as getUserSelector } from '../../../core/redux/user/selectors';
import { Pagination } from '../../../core/types/pagination.types';
import { AddressBlock } from './components/address-block/addressBlock';
import { UserCard } from './components/user-block/userData';

 const UserPage: React.FC = () => {
   const isLogIn = useSelector(getIsLogIn)
   const user = useSelector(getUserSelector)

   const dispatch = useDispatch()

   const getPaginatedUserAddresses = useCallback((isLogIn: boolean, pagination?: Pagination) => {
     isLogIn && dispatch(getPaginatedAddresses(pagination))
   },[dispatch]);

   useEffect(() => {
     if (isLogIn) {
       dispatch(getUser())
       getPaginatedUserAddresses(true, { offset: 0, size: ADDRESSES_PER_PAGE })
     }
   }, [dispatch, getPaginatedUserAddresses, isLogIn]);

  return (
    <div className="app">
      <div className="App__content">
        <div className="container userPageContainer">
          <div className="row user_page_container">
            <div className="col userCard">
              <UserCard user={user}/>
            </div>
              <div className="col addressCard">
              <div className="row">
                <AddressBlock getPaginatedUserAddresses={getPaginatedUserAddresses}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserPage