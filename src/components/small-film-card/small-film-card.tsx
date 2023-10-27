import React from 'react';
import { Link } from 'react-router-dom';

import { TFilm } from '../../types/TFilm.ts';

interface IFilmCard {
  film: TFilm;
}

export const SmallFilmCard: React.FC<IFilmCard> = ({film}) => {
  const {imageUrl, title, id} = film;
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={imageUrl} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{title}</Link>
      </h3>
    </article>
  );
};
