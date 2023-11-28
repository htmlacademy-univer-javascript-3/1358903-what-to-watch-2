import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Logo from '../../components/logo/logo.tsx';
import UserBlock from '../../components/user-block/user-block.tsx';
import { Buttons } from '../../components/button/buttons.ts';
import { Tabs } from '../../components/tabs/tabs.tsx';
import { ITab } from '../../components/tabs/types.ts';
import { Overview } from './overview.tsx';
import { Details } from './details.tsx';
import { Reviews } from './reviews.tsx';
import { LikeThis } from '../../components/like-this/like-this.tsx';
import { Page404 } from '../page-404/page-404.tsx';
import { Spinner } from '../../components/spinner/spinner.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import {
  selectFilmData, selectFilmError,
  selectFilmStatus
} from '../../store/films/film-selectors.ts';
import { authorizationStatusData } from '../../store/auth/auth-selectors.ts';
import { fetchFilm, fetchReviews, fetchSimilar } from '../../store/api-actions.ts';


export const Film: FC = () => {
  const { id = '' } = useParams();

  const film = useAppSelector(selectFilmData);
  const filmError = useAppSelector(selectFilmError);
  const filmStatus = useAppSelector(selectFilmStatus);
  const isAuth = useAppSelector(authorizationStatusData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchFilm(id));
      dispatch(fetchSimilar(id));
      dispatch(fetchReviews(id));
    }
  }, [id, dispatch]);


  const tabs: ITab[] = [
    {
      label: 'Overview',
      component: <Overview />
    },
    {
      label: 'Details',
      component: <Details />
    },
    {
      label: 'Reviews',
      component: <Reviews />
    }
  ];


  if (!film || filmStatus === 'LOADING') {
    return <Spinner/>;
  }

  if (filmError) {
    return <Page404/>;
  }
  // TODO next task
  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img
              src={film?.previewImage}
              alt={film?.name}
            />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />
            <UserBlock />
          </header>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">
                  {film.genre}
                </span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <Buttons.Play />
                <Buttons.MyListButton count={12} />
                {
                  isAuth && <Buttons.AddReview filmId={id}/>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={film.previewImage}
                alt={film.name}
                width="218"
                height="327"
              />
            </div>
            <div className="film-card__desc">
              <Tabs tabs={tabs} />
            </div>
          </div>
        </div>
      </section>

      <LikeThis genre={film.genre}/>
    </>
  );
};
