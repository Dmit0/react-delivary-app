import React from 'react';
import { NavBar } from '../../../../modules/navbar/navbar';
import { PopupContainer } from '../../../../modules/popup/popup';
import { Toast } from '../../../../modules/toast/toast';
import '../../../css/styles.css';
import '../../../css/content.css';

export const RootLayOut = ({ children }: {children: JSX.Element[] | JSX.Element}) => {
  return (
    <>
      <Toast/>
      <NavBar />
      <PopupContainer/>
      <div className="app">
        <div className="App__content">
          { children }
        </div>
      </div>
      <div className="App__footer"/>
    </>
  );
};