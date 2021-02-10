import React, { useEffect } from 'react';
import '../../../../../core/css/styles.css';
import './updateAddressPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { geoApi } from '../../../../../core/api/apis/geo.api';
import { ToolIcon } from '../../../../../core/components/icons';
import { getCurrentAddress } from '../../../../../core/redux/addresses/selectors';
import { set_current_country } from '../../../../../core/redux/countries/actions';
import { setCurrentRegion, setRegions } from '../../../../../core/redux/geo/actions';
import { LeftSideBar } from '../../components/sideBar/left-side-bar';
import { UpdatePage } from '../../components/updatePage/updatePageTempate';
import { UpdateAddressFrom } from './components/updateAddress.form';

const UpdateAddressPage: React.FC = () => {

  const dispatch = useDispatch()
  const currentAddress = useSelector(getCurrentAddress)

  useEffect(() => {
    currentAddress && fetchGeo(currentAddress.countryCode, currentAddress.country)
    currentAddress && dispatch(setCurrentRegion({name: currentAddress.region, isoCode: currentAddress.regionId}))
  }, [currentAddress])

  const fetchGeo = async (code: string, country: string) => {
    const regions = await geoApi.fetchRegions(code)
    regions && dispatch(setRegions(regions.data))
    dispatch(set_current_country({ name: country, code }))
  }

  return (
    <div className="app">
      <div className="container updatePage">
        <div className="row">
          <LeftSideBar/>
          <UpdatePage header={ 'Update Address' } Icon={ <ToolIcon/> }>
            <UpdateAddressFrom currentAddress={ currentAddress }/>
          </UpdatePage>
        </div>
      </div>
    </div>
  );
};
export default UpdateAddressPage