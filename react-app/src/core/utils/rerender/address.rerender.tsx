import React from 'react'
import { AddressCard } from '../../../modules/user/user-page/components/address-block/components/addressCard';
import { IHoleAddress } from '../../types';


export const rerender = {
  addressCards(addresses: IHoleAddress[], deleteAddress: (addressId: string) => void) {
    if (addresses.length !== 0 && addresses[0]?.region) return addresses.map(address => (
      <AddressCard address={address} deleteAddress={deleteAddress}/>
    ))
  }
}