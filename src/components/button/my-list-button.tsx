import React from 'react';

interface IMyListButtonProps {
	count: number;
}
export const MyListButton: React.FC<IMyListButtonProps> = ({ count }) => (
  <button className="btn btn--list film-card__button" type="button">
    <svg viewBox="0 0 19 20">
      <use xlinkHref="#add" />
    </svg>
    <span>My list</span>
    <span className="film-card__count">{count}</span>
  </button>

);
