import React, { useCallback, useEffect } from 'react';
import { authorizationStatusData } from '../../store/auth/auth-selectors.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { fetchFavoriteFilms, setFavorite } from '../../store/api-actions.ts';
import { selectfavoriteFilmsData, selectFilmData } from '../../store/films/film-selectors.ts';
import { useNavigate } from 'react-router-dom';

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
    if (authorizationStatus === true){
      dispatch(fetchFavoriteFilms());
    }
  }, [authorizationStatus, dispatch, film?.isFavorite]);


  const handleButtonClick = useCallback(() => {
    if (authorizationStatus === true){
      dispatch(setFavorite({status: film?.isFavorite ?? false, filmId: filmId}));
    } else {
      history('/login');
    }
  }, [authorizationStatus, dispatch, film?.isFavorite, filmId, history]);


  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleButtonClick}>
      {
        film?.isFavorite ? (
          <svg viewBox="0 0 18 14" width="18" height="14" data-testid="in-list">
            <use xlinkHref="#in-list" />
          </svg>) : (
          <svg viewBox="0 0 19 20" width="19" height="20" data-testid="add">
            <use xlinkHref="#add" />
          </svg>
        )
      }
      <span>My list</span>
      <span className="film-card__count">{selectFavoriteFilms?.length}</span>
    </button>
  );
};
