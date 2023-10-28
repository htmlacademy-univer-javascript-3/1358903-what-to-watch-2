import { films } from '../../mocks/films.ts';
import { FC, useCallback, useMemo } from 'react';
import { GenresItem } from './genres-item.tsx';
import { ECatalog, eCatalogValues } from '../../types/ECatalog.ts';
import { SmallFilmCard } from '../small-film-card/small-film-card.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { setGenre } from '../../store/action.ts';


interface ICatalog {
  withGenres?: boolean;
}
export const Catalog: FC<ICatalog> = ({withGenres}) => {

  const currentGenre = useAppSelector((state) => state.catalog.genre);

  const dispatch = useAppDispatch();

  const handleSetGenre = useCallback((value: ECatalog) => () => {
    dispatch(setGenre(value));
  }, [dispatch]);

  const filteredFilms = useMemo(() => {
    if (currentGenre === ECatalog.All) {
      return films;

    }
    return films.filter((film) => film.genre === currentGenre);
  }, [currentGenre]);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      {
        withGenres
          ? eCatalogValues.map((catalog) => <GenresItem catalog={catalog} key={catalog} setGenre={handleSetGenre} isActive={catalog === currentGenre}/>)
          : null
      }

      <div className="catalog__films-list">
        {
          filteredFilms.map((film) => <SmallFilmCard key={film.id} film={film}/>)
        }
      </div>

      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    </section>
  );
};
