import React from 'react';
import '../../../../../core/css/styles.css';
import './addAddressPage.css';
import { PlusDotIcon } from '../../../../../core/components/icons';
import { LeftSideBar } from '../../components/sideBar/left-side-bar';
import { UpdatePage } from '../../components/updatePage/updatePageTempate';
import { AddAddressFrom } from './components/addAddress.form';

const AddAddressPage: React.FC = () => {
  return (
    <div className="app">
      <div className="container updatePage">
        <div className="row">
          <LeftSideBar/>
          <UpdatePage header={ 'Add Address' } Icon={ <PlusDotIcon/> }>
            <AddAddressFrom/>
          </UpdatePage>
        </div>
      </div>
    </div>
  );
};
export default AddAddressPage