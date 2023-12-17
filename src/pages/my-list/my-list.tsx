import { FC, memo, useCallback } from 'react';
import { Footer } from '../../components/footer/footer.tsx';
import { FilmCardMemo } from '../../components/film-card/film-card.tsx';
import Logo from '../../components/logo/logo.tsx';
import { Page404 } from '../page-404/page-404.tsx';
import { Spinner } from '../../components/spinner/spinner.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { selectFilmsData, selectFilmsError, selectFilmsStatus } from '../../store/films/film-selectors.ts';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/api-actions.ts';


export const MyListPage: FC = () => {
  const films = useAppSelector(selectFilmsData);
  const filmsError = useAppSelector(selectFilmsError);
  const filmsStatus = useAppSelector(selectFilmsStatus);
  const dispatch = useAppDispatch();
  const history = useNavigate();

  const userLogout = useCallback(() => {
    dispatch(logout());
    history('/login');
  }, [dispatch, history]);

  if (filmsError) {
    return <Page404/>;
  }

  if (!films || filmsStatus === 'LOADING') {
    return <Spinner/>;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <span className="user-block__link" onClick={userLogout}>Sign out</span>
          </li>
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {
            films.map((film) => <FilmCardMemo key={film.id} film={film}/>)
          }
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export const MyList = memo(MyListPage);
