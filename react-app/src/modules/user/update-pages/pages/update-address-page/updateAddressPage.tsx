import React from 'react';
import '../../../../../core/css/styles.css';
import './updateAddressPage.css';
import { ToolIcon } from '../../../../../core/components/icons';
import { LeftSideBar } from '../../components/sideBar/left-side-bar';
import { UpdatePage } from '../../components/updatePage/updatePageTempate';

const UpdateAddressPage: React.FC = () => {
  return (
    <div className="app">
      <div className="container">
        <div className="row">
          <LeftSideBar/>
          <UpdatePage header={ 'Update Address' } Icon={ <ToolIcon/> }>

          </UpdatePage>
        </div>
      </div>
    </div>
  );
};
export default UpdateAddressPage