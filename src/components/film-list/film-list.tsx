import {FilmCard} from '../film-card/film-card.tsx';
import {FC} from 'react';
import { useAppSelector } from '../../hooks/store.ts';
import { selectFilmsData } from '../../store/films/film-selectors.ts';

export const FilmList: FC = () => {
  const films = useAppSelector(selectFilmsData);


  return (<div className="catalog__films-list">
    {films?.map((film) => (
      <FilmCard key={film.id}
        film={film}
      />
    ))}

          </div>);
};
