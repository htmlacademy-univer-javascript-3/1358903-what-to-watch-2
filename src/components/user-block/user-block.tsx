import React from 'react';
import { Link } from 'react-router-dom';

const UserBlock: React.FC = () => (
  <ul className="user-block">
    <li className="user-block__item">
      <Link to='/mylist'>
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </Link>
    </li>
    <li className="user-block__item">
      <Link to='/login' className="user-block__link">
        Sign out
      </Link>
    </li>
  </ul>
);

export default UserBlock;
