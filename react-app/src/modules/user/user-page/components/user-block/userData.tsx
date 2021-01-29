import React from 'react';
import '../../user.style.css';
import { Link } from 'react-router-dom';
import { Links } from '../../../../../core/enums';
import { UserRedux } from '../../../../../core/types';
import { formatDate } from '../../../../../core/utils/date.utils';

interface UserCardProps {
  user: UserRedux
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
        <div className="user_info_part">
          <div className="user-info_title">
            <span className="user-info-title-item">{ user.userName }</span>
            <span className="user-info-title-item">{ user.role?.name }</span>
          </div>
          <div className="user_info_body">
            <span className="user-info-body-item">{ user.email }</span>
            <span className="user-info-body-item">{ `${ user.phone?.code }${ user.phone?.phoneNumber }` }</span>
            <span className="user-info-body-item">since from { user.createdAt && formatDate(user.createdAt, 'DD.MM.YYYY') }</span>
          </div>
          <div className="user_info_footer">
            <Link to={`${Links.USER}${Links.USER_UPDATE}`}>
              <button
                type="button"
                className="btn btn-warning user-info-footer-item">
                Update
              </button>
            </Link>
          </div>
        </div>
  );
};