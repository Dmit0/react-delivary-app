import React, { useEffect } from 'react';
import './user.style.css'
import '../../../core/css/styles.css';
import '../../../core/css/content.css';
import { useDispatch, useSelector } from 'react-redux';
import { UserApi } from '../../../core/api/apis/user.api';
import { setUser } from '../../../core/redux/user/actions';
import { getToken, getUser } from '../../../core/redux/user/selectors';
import { AddressBlock } from './components/address-block/addressBlock';
import { UserCard } from './components/user-block/userData';

 const UserPage: React.FC = () => {
   const token = useSelector(getToken)
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

   const getUserData = async (token: string | null) => token && await UserApi.getUser(token);

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
                <AddressBlock userAddresses={user.addresses}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserPage