import React, { ReactNode } from 'react';
import './updatePage.css'

interface UpdatePageProps {
  header: string,
  Icon: ReactNode,
  children: JSX.Element[] | JSX.Element
}

export const UpdatePage = ({header, Icon, children}: UpdatePageProps) => {
  return (
    <div className="col update_page_content">
      <div className="update_page_form">
        <div className="update_page_form_title">
          <span className="update_title_text">{header}</span>
          {Icon}
        </div>
        <div className="update_title_body">
          {children}
        </div>
      </div>
    </div>
  );
};