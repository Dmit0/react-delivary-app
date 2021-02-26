import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { SelectField } from '../../../../../core/components/form-fields/select-form-field/selectField';
import { getSelectCountries } from '../../../../../core/redux/countries/selectors';
import { getSelectAddresses } from '../../../../../core/redux/user/selectors';
import { OrderAddressCreate } from './orderAddressCreate';


export const OrderAddressSelect = () => {
  const selectCountries = useSelector(getSelectCountries);
  const userAllAddresses = useSelector(getSelectAddresses);

  const [needNewAddress, setIsNeedNewAddress] = useState<boolean>(false)

  const handleChangeCountry = useCallback((e) => {

  }, [])

  return (
    <div className='addressSelect'>
      <div className='addressSelectBody'>
        {
          needNewAddress
            ? <OrderAddressCreate/>
            : <SelectField
              name='address'
              label='Your address'
              options={ userAllAddresses }
              changeSelectHandler={ (event: any) => handleChangeCountry(event) }
            />
        }
      </div>
      <div className='addressSelectFooter'>
        { needNewAddress
           ? <button className="btn btn-outline-primary" onClick={() => setIsNeedNewAddress(false)}>return to select</button>
           : <button className="btn btn-outline-primary" onClick={() => setIsNeedNewAddress(true)}>Other address</button>
        }
      </div>
    </div>
  );
};