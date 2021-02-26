import React, { useCallback, useEffect } from 'react';
import './user.style.css'
import '../../../core/css/styles.css';
import '../../../core/css/content.css';
import { useDispatch, useSelector } from 'react-redux';
import { AddressApi } from '../../../core/api/apis/address.api';
import { UserApi } from '../../../core/api/apis/user.api';
import { setAddresses } from '../../../core/redux/user-page/address-module/actions/address-module.actions';
import { ADDRESSES_PER_PAGE } from '../../../core/redux/user-page/types';
import { setUser } from '../../../core/redux/user/actions';
import { getIsLogIn, getUser } from '../../../core/redux/user/selectors';
import { Pagination } from '../../../core/types/pagination.types';
import { AddressBlock } from './components/address-block/addressBlock';
import { UserCard } from './components/user-block/userData';

 const UserPage: React.FC = () => {
   const token = useSelector(getIsLogIn)
   const user = useSelector(getUser)

   const dispatch = useDispatch()

   useEffect(() => {
     getUserData(token).then(userData => {
       if (userData) {
         const { user, role, addresses, phone } = userData;
         dispatch(setUser({
           email: user.email,
           firstName: user.name,
           userId: user._id,
           createdAt: user.createdAt,
           role,
           addresses,
           phone
         }));
       }
     });
   }, []);

   useEffect(() => {
     getPaginatedUserAddresses(token, { offset: 0, size: ADDRESSES_PER_PAGE }).catch((e) => console.log(e))
   }, [])

   const getUserData = async (token: boolean) => token && await UserApi.getUser();

   const getPaginatedUserAddresses = useCallback(async (token: boolean, pagination?: Pagination) => {
     const addresses = token && await AddressApi.getPaginatedAddresses(pagination);
     addresses && dispatch(setAddresses(addresses));
   },[dispatch]);

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