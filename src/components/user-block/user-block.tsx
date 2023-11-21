import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store.ts';
import { userStatusData } from '../../store/auth/auth-selectors.ts';

const UserBlock: React.FC = () => {
  const user = useAppSelector(userStatusData);

  return (<ul className="user-block">
    <li className="user-block__item">
      <Link to='/mylist'>
        <div className="user-block__avatar">
          <img src={user?.avatarUrl} alt="User avatar" width="63" height="63" />
        </div>
      </Link>
    </li>
    <li className="user-block__item">
      <Link to='/login' className="user-block__link">
        Sign out
      </Link>
    </li>
  </ul>);
};

export default UserBlock;
