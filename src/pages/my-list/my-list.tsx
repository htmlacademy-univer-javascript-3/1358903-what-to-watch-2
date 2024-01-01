import { FC, memo, useCallback, useEffect } from 'react';
import { Footer } from '../../components/footer/footer.tsx';
import { FilmCardMemo } from '../../components/film-card/film-card.tsx';
import Logo from '../../components/logo/logo.tsx';
import { Spinner } from '../../components/spinner/spinner.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { selectfavoriteFilmsData, selectfavoriteFilmsStatus } from '../../store/films/film-selectors.ts';
import { useNavigate } from 'react-router-dom';
import { fetchFavoriteFilms, logout } from '../../store/api-actions.ts';
import { ApiStatusPendingEnum } from '../../types/api.ts';


export const MyListPage: FC = () => {
  const isFavoriteFilmsStatus = useAppSelector(selectfavoriteFilmsStatus);
  const films = useAppSelector(selectfavoriteFilmsData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteFilms());
  }, [dispatch]);

  const history = useNavigate();

  const userLogout = useCallback(() => {
    dispatch(logout());
    history('/login');
  }, [dispatch, history]);

  if (isFavoriteFilmsStatus === ApiStatusPendingEnum.LOADING) {
    return (<Spinner/>);
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title" id='my-list-title'>My list <span className="user-page__film-count">{films?.length}</span></h1>
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <button onClick={userLogout} className="user-block__link sign-out">Sign out</button>
          </li>
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {
            films?.map((film) => <FilmCardMemo key={film.id} film={film}/>)
          }
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export const MyList = memo(MyListPage);
