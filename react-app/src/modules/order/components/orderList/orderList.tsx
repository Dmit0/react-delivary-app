import React, { useCallback, useEffect, useState } from 'react';
import './orderList.css';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { InputField } from '../../../../core/components/form-fields/input-form-field/input';
import { PhoneField } from '../../../../core/components/form-fields/input-phone-field/input.phone';
import { getCurrentCartSum } from '../../../../core/redux/cart/selectors';
import { getSelectCountries } from '../../../../core/redux/countries/selectors';
import { getIsAddressConfirm } from '../../../../core/redux/order/selectors';
import { RootState } from '../../../../core/redux/rootReducer';
import { getUser } from '../../../../core/redux/user/selectors';
import { getEmailValidation, getPhoneValidation, getRequiredValidation } from '../../../../core/utils/form-validation.utils';

export const OrderInfo = () => {

  const user = useSelector(getUser);
  const cartSum = useSelector(getCurrentCartSum);
  const dealCountriesSelectCodes = useSelector((state: RootState) => getSelectCountries(state, true));
  const isConfirmedAddress = useSelector(getIsAddressConfirm);
  const [phonePrefix, setPhonePrefix] = useState<string>('')

  const changeSelectHandler = useCallback(({value}) => {
    setPhonePrefix(value)
  }, [setPhonePrefix])

  useEffect(() => {
    setPhonePrefix(user.phone?.code || '')
  }, [user])

  const {errors, register, handleSubmit} = useForm({ mode: 'onChange', reValidateMode: 'onChange' });
  const onSubmit = (data: any) => {
    if (isConfirmedAddress) {
      console.log(data)
    }
  }
  return (
    <div className='orderForm'>
      <div className='orderFormHeader'>Order Info</div>
      <div className='orderFormBody'>
        <form className='order' onSubmit={ handleSubmit(onSubmit) }>
          <div className='orderInputs'>
          <InputField
            name='name'
            label='Name'
            defaultValue={ user.userName || '' }
            placeHolder={'Enter name'}
            rules={ getRequiredValidation() }
            errors={ errors.name }
            register={ register }
          />
          <InputField
            name='email'
            label='Email Address'
            defaultValue={ user.email || '' }
            placeHolder={'Enter email'}
            rules={ getEmailValidation(false, false) }
            errors={ errors.email }
            register={ register }
          />
            <PhoneField
              name='telephone'
              selectName='telephone'
              selectPlaceHolder='+ ...'
              label='Telephone number'
              register={register}
              errors={errors.telephone}
              options={dealCountriesSelectCodes}
              rules={getPhoneValidation(7,11, '', false)}
              currentSelectValue={phonePrefix ? { value: phonePrefix, label: phonePrefix } : null}
              changeSelectHandler={(e) => changeSelectHandler(e)}
              defaultInputValue={user.phone ? user.phone.phoneNumber : ''}
            />
          </div>
      <div className='orderFormFooter'>
        <div className='orderPrices'>
          <div className='orderPriceItem'>
            <span className='orderPriceItemName'>Subtotal</span>
            <span className='orderPriceEItemFee'>{cartSum} р</span>
          </div>
          <div className='orderPriceItem'>
            <span className='orderPriceItemName'>Delivery fee</span>
            <span className='orderPriceEItemFee'>5 р</span>
          </div>
          <div className='orderPriceItem'>
            <span className='orderPriceItemName'>Total</span>
            <span className='orderPriceEItemFee'>{cartSum + 5} р</span>
          </div>
        </div>
        <div className='OrderConfirm'>
          <div className='btnConfirmButtonBlock'>
            <button
              type="submit"
              className="btn btn-outline-warning btnConfirmButton">
              Continue
            </button>
          </div>
        </div>
        <div>
        </div>
      </div>
    </form>
      </div>
    </div>
  )
}