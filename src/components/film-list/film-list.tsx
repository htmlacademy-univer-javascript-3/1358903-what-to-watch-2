import {films} from '../../mocks/films.ts';
import {FilmCard} from '../film-card/film-card.tsx';
import {FC} from 'react';

export const FilmList: FC = () => (
  <div className="catalog__films-list">
    {films.map((film) => (
      <FilmCard key={film.id}
        film={film}
      />
    ))}

  </div>
);
