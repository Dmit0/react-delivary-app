import React from 'react';
import { NavBar } from '../../../../modules/navbar/navbar';
import { PopupContainer } from '../../../../modules/popup/popup';
import { Toast } from '../../../../modules/toast/toast';

export const RootLayOut = ({ children }: {children: JSX.Element[] | JSX.Element}) => {
  return (
    <>
      <Toast/>
      <NavBar />
      <PopupContainer/>
      {children}
      <div className="App__footer"/>
    </>
  );
};