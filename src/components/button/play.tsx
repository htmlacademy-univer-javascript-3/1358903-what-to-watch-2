import React from 'react';
import { Link } from 'react-router-dom';

interface IPlay {
	id?: string;
}

export const Play: React.FC<IPlay> = ({ id }) => (
  <Link to={`/player/${id}`} className="btn btn--play film-card__button" type="button">
    <svg viewBox="0 0 19 19">
      <use xlinkHref="#play-s" />
    </svg>
    <span>Play</span>
  </Link>

);
