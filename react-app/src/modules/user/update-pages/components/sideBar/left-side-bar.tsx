import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '../../../../../core/components/icons/arrowLeft.icon';
import { Links } from '../../../../../core/enums';
import './left-side-bar.css'

export const LeftSideBar = () => {
  return (
    <div className="col-4 update_page_background">
      <div className="page_return">
        <Link to={ Links.USER }>
          <ArrowLeftIcon/>
        </Link>
      </div>
    </div>
  );
};