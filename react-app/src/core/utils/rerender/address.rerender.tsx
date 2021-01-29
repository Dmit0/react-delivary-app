import React from 'react'
import { AddressCard } from '../../../modules/user/user-page/components/address-block/components/addressCard';
import { HoleAddress } from '../../types';


export const rerender = {
  addressCards(addresses: HoleAddress[]) {
    if (addresses.length !== 0) return addresses.map(address => (
      <AddressCard address={address}/>
    ))
  }
}