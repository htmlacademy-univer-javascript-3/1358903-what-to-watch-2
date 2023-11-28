import { FC, useEffect } from 'react';
import { Footer } from '../../components/footer/footer.tsx';
import { FilmCard } from '../../components/film-card/film-card.tsx';
import { Catalog } from '../../components/catalog/catalog.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { Spinner } from '../../components/spinner/spinner.tsx';
import { Page404 } from '../page-404/page-404.tsx';
import {
  selectFilmData,
  selectFilmsData,
  selectFilmsError,
  selectFilmsStatus
} from '../../store/films/film-selectors.ts';
import { fetchMovies, fetchPromo } from '../../store/api-actions.ts';

export const Main: FC = () => {
  const dispatch = useAppDispatch();
  const film = useAppSelector(selectFilmData);
  const films = useAppSelector(selectFilmsData);
  const filmError = useAppSelector(selectFilmsError);
  const filmStatus = useAppSelector(selectFilmsStatus);

  useEffect(() => {
    dispatch(fetchPromo());
    if (films === null) {
      dispatch(fetchMovies());
    }
  }, [dispatch, films]);


  if (filmError) {
    return <Page404/>;
  }

  if (!film || filmStatus === 'LOADING') {
    return <Spinner/>;
  }

  return (<>
    <FilmCard film={film} />

    <div className="page-content">
      <Catalog withGenres />
      <Footer/>
    </div>
  </>);
};
