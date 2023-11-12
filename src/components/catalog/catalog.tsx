import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { GenresItem } from './genres-item.tsx';
import { ECatalog, eCatalogValues } from '../../types/ECatalog.ts';
import { SmallFilmCard } from '../small-film-card/small-film-card.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { fetchMovies, setGenre } from '../../store/action.ts';
import { Page404 } from '../../pages/page-404/page-404.tsx';
import { Spinner } from '../spinner/spinner.tsx';
import { selectFilmsData, selectFilmsError, selectFilmsStatus } from '../../store/reducer.ts';

const VISIBLE_FILMS_COUNT = 8;

interface ICatalog {
  withGenres?: boolean;
}
export const Catalog: FC<ICatalog> = ({withGenres}) => {
  const [visibleFilmsCount, setVisibleFilmsCount] = useState(VISIBLE_FILMS_COUNT);
  const currentGenre = useAppSelector((state) => state.catalog.genre);
  const films = useAppSelector(selectFilmsData);
  const filmsError = useAppSelector(selectFilmsError);
  const filmsStatus = useAppSelector(selectFilmsStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (films === null) {
      dispatch(fetchMovies());
    }
  }, [dispatch, films]);

  const handleSetGenre = useCallback((value: ECatalog) => () => {
    dispatch(setGenre(value));
    setVisibleFilmsCount(VISIBLE_FILMS_COUNT);
  }, [dispatch]);


  const filteredFilms = useMemo(() => {
    if (currentGenre === ECatalog.All) {
      return films;
    }
    return films?.filter((film) => film.genre === currentGenre);
  }, [currentGenre, films]);

  const handleShowMoreClick = useCallback(() => {
    const newVisibleCount = Math.min(visibleFilmsCount + VISIBLE_FILMS_COUNT, filteredFilms?.length || 0);
    setVisibleFilmsCount(newVisibleCount);
  }, [visibleFilmsCount, filteredFilms]);

  const isShowMore = useMemo(() => {
    if (filteredFilms?.length) {
      return filteredFilms?.length - visibleFilmsCount > 0;
    }
    return 0;
  } , [filteredFilms, visibleFilmsCount]);

  if (filmsError) {
    return <Page404/>;
  }

  if (!films || filmsStatus === 'LOADING') {
    return <Spinner/>;
  }

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <ul className="catalog__genres-list">
        {
          withGenres && eCatalogValues.map((catalog) => <GenresItem catalog={catalog} key={catalog} setGenre={handleSetGenre} isActive={catalog === currentGenre}/>)
        }
      </ul>


      <div className="catalog__films-list">
        {filteredFilms?.slice(0, visibleFilmsCount).map((film) => (
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
