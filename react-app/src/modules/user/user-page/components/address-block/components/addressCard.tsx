import React from 'react';
import '../../../user.style.css';
import { DeleteIcon } from '../../../../../../core/components/icons';
import { HoleAddress } from '../../../../../../core/types';

interface UserAddressCard {
  address: HoleAddress
}

export const AddressCard: React.FC<UserAddressCard> = ({address}) => {
  return (
    <>
    <div className="user-address-card">
      <div className="user-address-card-body">
        <div className="user-address-card-info">
          <span>{address.country}</span>
          <span>{address.region}</span>
          <span>{address.street}</span>
          <span>{address.streetNumber}</span>
        </div>
        <div className="user-address-card-controls">
          <div className="user-address-card-delete">
            <DeleteIcon/>
          </div>
          <div className="user-address-card-update">
            <button
              type="button"
              className="btn btn-warning user-info-footer-item">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
      <div className="user-address-card">
        <div className="user-address-card-body">
          <div className="user-address-card-info">
            <span>{address.country}</span>
            <span>{address.region}</span>
            <span>{address.street}</span>
            <span>{address.streetNumber}</span>
          </div>
          <div className="user-address-card-controls">
            <div className="user-address-card-delete">
              <DeleteIcon/>
            </div>
            <div className="user-address-card-update">
              <button
                type="button"
                className="btn btn-warning user-info-footer-item">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      </>
  );
};