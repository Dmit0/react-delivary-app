import React from 'react';
import '../../user.style.css';
import { HoleAddress } from '../../../../core/types';
import { rerender } from '../../../../core/utils/rerender/address.rerender';

interface UserAddressBlock {
  userAddresses: HoleAddress[]
}

export const AddressBlock: React.FC<UserAddressBlock> = ({ userAddresses }) => {
  return (
    <div className="col user_address_part">
      <div className="user-address_block_title">
        <span className="user-address_block_title_item">User Addresses</span>
      </div>
      <div className="user-address-block-body">
        { rerender.addressCards(userAddresses) }
      </div>
      <div className="user-address-block-footer">
        <div className="paging">
          <span className="paging-item">1</span>
          <span className="paging-item">2</span>
          <span className="paging-item">3</span>
        </div>
        <div className="add_address_button">
          <button
            type="button"
            className="btn btn-outline-success user-address-footer-item">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};