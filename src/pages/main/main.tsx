import { FC, useEffect } from 'react';
import { Footer } from '../../components/footer/footer.tsx';
import { FilmCard } from '../../components/film-card/film-card.tsx';
import { Catalog } from '../../components/catalog/catalog.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { Spinner } from '../../components/spinner/spinner.tsx';
import { Page404 } from '../page-404/page-404.tsx';
import { selectFilmsData, selectFilmsError, selectFilmsStatus } from '../../store/films/film-selectors.ts';
import { fetchMovies } from '../../store/api-actions.ts';

export const Main: FC = () => {
  const dispatch = useAppDispatch();
  const films = useAppSelector(selectFilmsData);
  const filmsError = useAppSelector(selectFilmsError);
  const filmsStatus = useAppSelector(selectFilmsStatus);

  useEffect(() => {
    if (films === null) {
      dispatch(fetchMovies());
    }
  }, [dispatch, films]);

  if (filmsError) {
    return <Page404/>;
  }

  if (!films || filmsStatus === 'LOADING') {
    return <Spinner/>;
  }

  return (<>
    <FilmCard film={films[0]} />

    <div className="page-content">
      <Catalog withGenres />
      <Footer/>
    </div>
  </>);
};
