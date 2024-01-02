import React, { useCallback, useEffect } from 'react';
import { authorizationStatusData } from '../../store/auth/auth-selectors.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { fetchFavoriteFilms, setFavorite } from '../../store/api-actions.ts';
import { selectfavoriteFilmsData, selectFilmData } from '../../store/films/film-selectors.ts';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../icon/icon.tsx';

interface IMyListButtonProps {
  filmId: string;
}
export const MyListButton: React.FC<IMyListButtonProps> = ({ filmId }) => {

  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(authorizationStatusData);
  const film = useAppSelector(selectFilmData);
  const selectFavoriteFilms = useAppSelector(selectfavoriteFilmsData);
  const history = useNavigate();
  useEffect(() => {
    if (authorizationStatus){
      dispatch(fetchFavoriteFilms());
    }
  }, [authorizationStatus, dispatch, film?.isFavorite]);


  const handleButtonClick = useCallback(() => {
    if (authorizationStatus){
      dispatch(setFavorite({status: film?.isFavorite ?? false, filmId: filmId}));
    } else {
      history('/login');
    }
  }, [authorizationStatus, dispatch, film?.isFavorite, filmId, history]);


  return (
    <button data-testid="card-link" className="btn btn--list film-card__button" type="button" onClick={handleButtonClick}>
      {
        film?.isFavorite ? (
          <Icon xlinkHref={'#in-list'} height={'14'} width={'18'} viewBox={'0 0 18 14'} dataTestId={'in-list'}/>
        ) : (
          <Icon xlinkHref={'#add'} height={'20'} width={'19'} viewBox={'0 0 19 20'} dataTestId={'add'}/>
        )
      }
      <span>My list</span>
      <span className="film-card__count">{selectFavoriteFilms?.length}</span>
    </button>
  );
};
