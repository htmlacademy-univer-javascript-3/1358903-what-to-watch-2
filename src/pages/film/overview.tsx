import { FC, memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { IReview } from '../../types/review.ts';
import { useAppSelector } from '../../hooks/store.ts';
import { selectFilmsData, selectFilmsError, selectFilmsStatus } from '../../store/films/film-selectors.ts';
import { Page404 } from '../page-404/page-404.tsx';
import { Spinner } from '../../components/spinner/spinner.tsx';


const Overview: FC = () => {
  const params = useParams();
  const films = useAppSelector(selectFilmsData);
  const film = films?.find((f) => f.id === params.id);
  const filmsError = useAppSelector(selectFilmsError);
  const filmsStatus = useAppSelector(selectFilmsStatus);

  const calculateTotalRating = useCallback((reviews: IReview[] | undefined) => {
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    return reviews.reduce((acc, next) => acc + next.rating, 0);
  }, []);

  const score = useMemo(() => {
    const totalRating = calculateTotalRating([]);
    return totalRating / ([]?.length || 1); // Используем 1, чтобы избежать деления на 0
  }, [calculateTotalRating]);

  const ratingCount = useMemo(() => calculateTotalRating([]), [calculateTotalRating]);


  if (filmsError) {
    return <Page404/>;
  }

  if (!film || filmsStatus === 'LOADING') {
    return <Spinner/>;
  }

  return (
    <div className="film-card__desc">
      <div className="film-rating">
        <div className="film-rating__score">{score}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">{ratingCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film?.description}</p>
        <p className="film-card__director"><strong>Director: {film?.director}</strong></p>
        <p className="film-card__starring"><strong>Starring: {film?.starring.join(', ')}</strong></p>
      </div>
    </div>
  );

};

export const OverviewMemo = memo(Overview);
