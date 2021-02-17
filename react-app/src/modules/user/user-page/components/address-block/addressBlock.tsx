import React, { useCallback } from 'react';
import '../../user.style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AddressApi } from '../../../../../core/api/apis/address.api';
import { Divider } from '../../../../../core/components/decor';
import { Paging } from '../../../../../core/components/pagination/paging';
import { Links } from '../../../../../core/enums';
import { setCurrentPage } from '../../../../../core/redux/user-page/address-module/actions/address-module.actions';
import { getCurrentPage } from '../../../../../core/redux/user-page/address-module/selectors';
import { deleteUserAddress } from '../../../../../core/redux/user/actions';
import { getToken } from '../../../../../core/redux/user/selectors';
import { IHoleAddress } from '../../../../../core/types';
import { rerender } from '../../../../../core/utils/rerender/address.rerender';

interface UserAddressBlock {
  userAddresses: IHoleAddress[]
}

export const AddressBlock: React.FC<UserAddressBlock> = ({ userAddresses }) => {

  const token = useSelector(getToken)
  const dispatch = useDispatch()
  const currentPage = useSelector(getCurrentPage)

  const deleteAddress = useCallback(async(addressId: string) => {
    const response = token && await AddressApi.deleteAddress(token, addressId)
    response && dispatch(deleteUserAddress(addressId))
  },[dispatch, token])

  const onPageChange = useCallback((pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber))
  }, [dispatch])

  return (
    <div className="col user_address_part">
      <div className="user-address_block_title">
        <span className="user-address_block_title_item">User Addresses</span>
        <Link to={`${Links.USER}${Links.ADDRESS_ADD}`}>
          <button
            type="button"
            className="btn btn-outline-success user-address-footer-item">
            Add
          </button>
        </Link>
      </div>
      {userAddresses[0]?.region && <Divider/>}
      <div className="user-address-block-body">
        { rerender.addressCards(userAddresses, deleteAddress) }
      </div>
      { userAddresses.length > 0 && <div className="user-address-block-footer">
        <Paging pageCount={10} currentPage={currentPage} onPageChange={onPageChange}/>
      </div>
      }
    </div>
  );
};