import React, { useCallback, useMemo } from 'react';
import '../../user.style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AddressApi } from '../../../../../core/api/apis/address.api';
import { Divider } from '../../../../../core/components/decor';
import { Paging } from '../../../../../core/components/pagination/paging';
import { Links } from '../../../../../core/enums';
import { setCurrentPage } from '../../../../../core/redux/user-page/address-module/actions/address-module.actions';
import { getAddressesTotal, getCurrentPage, getCurrentPageAddresses } from '../../../../../core/redux/user-page/address-module/selectors';
import { ADDRESSES_PER_PAGE } from '../../../../../core/redux/user-page/types';
import { getIsLogIn } from '../../../../../core/redux/user/selectors';
import { Pagination } from '../../../../../core/types/pagination.types';
import { rerender } from '../../../../../core/utils/rerender/address.rerender';
import { deleteAddress as deleteAddressAction } from '../../../../../core/redux/user-page/address-module/actions/address-module.actions'

export const AddressBlock = ({getPaginatedUserAddresses}: {getPaginatedUserAddresses(isLogIn: boolean, pagination?: Pagination): void}) => {

  const isLogIn = useSelector(getIsLogIn);
  const userAddresses = useSelector(getCurrentPageAddresses);
  const total = useSelector(getAddressesTotal)
  const dispatch = useDispatch();
  const currentPage = useSelector(getCurrentPage);

  const deleteAddress = useCallback(async(addressId: string) => { //TODO `Thunk`
    const response = isLogIn && await AddressApi.deleteAddress(addressId)
    response && dispatch(deleteAddressAction(addressId))
  },[dispatch, isLogIn])

  const getPaginatedOffset = useCallback((pageNumber: number): number => {
    return (pageNumber - 1)  * ADDRESSES_PER_PAGE
  }, [])

  const onPageChange = useCallback((pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
    isLogIn && getPaginatedUserAddresses(isLogIn, { offset: getPaginatedOffset(pageNumber), size: ADDRESSES_PER_PAGE })
  }, [dispatch, getPaginatedOffset, getPaginatedUserAddresses, isLogIn])

  const currentPaginatedItems = useMemo(() => {
    return Math.ceil(total / ADDRESSES_PER_PAGE)
  }, [total])

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
        <Paging pageCount={currentPaginatedItems} currentPage={currentPage} onPageChange={onPageChange}/>
      </div>
      }
    </div>
  );
};