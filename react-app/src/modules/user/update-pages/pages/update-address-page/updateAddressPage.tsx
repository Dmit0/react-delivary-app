import React, { useEffect } from 'react';
import '../../../../../core/css/styles.css';
import './updateAddressPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { ToolIcon } from '../../../../../core/components/icons';
import { Locality } from '../../../../../core/enums/locality.enum';
import { getCurrentAddress } from '../../../../../core/redux/addresses/selectors';
import { set_current_country } from '../../../../../core/redux/countries/actions';
import { fetchGeo, setCurrentRegion } from '../../../../../core/redux/geo/actions';
import { LeftSideBar } from '../../components/sideBar/left-side-bar';
import { UpdatePage } from '../../components/updatePage/updatePageTempate';
import { UpdateAddressFrom } from './components/updateAddress.form';

const UpdateAddressPage: React.FC = () => {

  const dispatch = useDispatch()
  const currentAddress = useSelector(getCurrentAddress)

  useEffect(() => {
    if (currentAddress) {
      dispatch(setCurrentRegion({name: currentAddress.region, isoCode: currentAddress.regionId}))
      dispatch(set_current_country({ code: currentAddress.countryCode, name: currentAddress.country }))
      dispatch(fetchGeo(Locality.REGION, currentAddress.countryCode))
    }
  }, [currentAddress, dispatch])

  return (
      <div className="container updatePage">
        <div className="row">
          <LeftSideBar/>
          <UpdatePage header={ 'Update Address' } Icon={ <ToolIcon/> }>
            <UpdateAddressFrom/>
          </UpdatePage>
        </div>
      </div>
  );
};
export default UpdateAddressPage