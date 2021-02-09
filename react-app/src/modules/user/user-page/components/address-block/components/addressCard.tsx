import React from 'react';
import '../../../user.style.css';
import { Link } from 'react-router-dom';
import { Divider } from '../../../../../../core/components/decor';
import { DeleteIcon } from '../../../../../../core/components/icons';
import { Links } from '../../../../../../core/enums';
import { IHoleAddress } from '../../../../../../core/types';

interface UserAddressCard {
  address: IHoleAddress
  deleteAddress(addressId: string): void
}

export const AddressCard: React.FC<UserAddressCard> = ({address, deleteAddress}) => {
  return (
    <div className="user-address-card">
      <div className="user-address-card-body">
        <div className="user-address-card-info">
          <span>{address.country}</span>
          <span>{address.region}</span>
          <span>{address.street}</span>
          <span>{address.streetNumber}</span>
        </div>
        <div className="user-address-card-controls">
          <div className="user-address-card-delete" onClick={() => deleteAddress(address._id)}>
            <DeleteIcon/>
          </div>
          <div className="user-address-card-update">
            <Link to={`${Links.USER}${Links.ADDRESS_UPDATE_PATH}/${address._id}`}>
              <button
                type="button"
                className="btn btn-warning user-info-footer-item">
                Update
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Divider/>
    </div>
  );
};