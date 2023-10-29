import { films } from '../../mocks/films.ts';
import { FC, useCallback, useMemo, useState } from 'react';
import { GenresItem } from './genres-item.tsx';
import { ECatalog, eCatalogValues } from '../../types/ECatalog.ts';
import { SmallFilmCard } from '../small-film-card/small-film-card.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { setGenre } from '../../store/action.ts';

const VISIBLE_FILMS_COUNT = 8;

interface ICatalog {
  withGenres?: boolean;
}
export const Catalog: FC<ICatalog> = ({withGenres}) => {
  const [visibleFilmsCount, setVisibleFilmsCount] = useState(VISIBLE_FILMS_COUNT);
  const currentGenre = useAppSelector((state) => state.catalog.genre);

  const dispatch = useAppDispatch();

  const handleSetGenre = useCallback((value: ECatalog) => () => {
    dispatch(setGenre(value));
    setVisibleFilmsCount(VISIBLE_FILMS_COUNT);
  }, [dispatch]);


  const filteredFilms = useMemo(() => {
    if (currentGenre === ECatalog.All) {
      return films;

    }
    return films.filter((film) => film.genre === currentGenre);
  }, [currentGenre]);

  const handleShowMoreClick = useCallback(() => {
    const newVisibleCount = Math.min(visibleFilmsCount + VISIBLE_FILMS_COUNT, filteredFilms.length);
    setVisibleFilmsCount(newVisibleCount);
  }, [visibleFilmsCount, filteredFilms]);

  const isShowMore = useMemo(() => (filteredFilms.length - visibleFilmsCount) > 0, [filteredFilms, visibleFilmsCount]);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      {
        withGenres && eCatalogValues.map((catalog) => <GenresItem catalog={catalog} key={catalog} setGenre={handleSetGenre} isActive={catalog === currentGenre}/>)
      }

      <div className="catalog__films-list">
        {filteredFilms.slice(0, visibleFilmsCount).map((film) => (
          <SmallFilmCard key={film.id} film={film} />
        ))}
      </div>
      {
        isShowMore && (<div className="catalog__more">
          <button className="catalog__button" type="button" onClick={handleShowMoreClick}>Show more</button>
        </div>)
      }

    </section>
  );
};
