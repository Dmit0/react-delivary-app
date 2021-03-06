import React from 'react';
import '../../../../../core/css/styles.css';
import './updateUserPage.css';
import { ToolIcon } from '../../../../../core/components/icons';
import { LeftSideBar } from '../../components/sideBar/left-side-bar';
import { UpdatePage } from '../../components/updatePage/updatePageTempate';
import { UpdateUserFrom } from './components/update.form';

const UpdateUserPage: React.FC = () => {
  return (
      <div className="container updatePage">
        <div className="row">
          <LeftSideBar/>
          <UpdatePage header={ 'Update User' } Icon={ <ToolIcon/> }>
            <UpdateUserFrom/>
          </UpdatePage>
        </div>
      </div>
  );
};
export default UpdateUserPage