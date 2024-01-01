import { FC, memo, useCallback, useMemo } from 'react';
import { IReview } from '../../types/review.ts';
import { useAppSelector } from '../../hooks/store.ts';
import { selectFilmData, selectFilmStatus, } from '../../store/films/film-selectors.ts';
import { Spinner } from '../../components/spinner/spinner.tsx';
import { ApiStatusPendingEnum } from '../../types/api.ts';
import { Page404 } from '../page-404/page-404.tsx';


const Overview: FC = () => {
  const film = useAppSelector(selectFilmData);
  const filmStatus = useAppSelector(selectFilmStatus);
  const calculateTotalRating = useCallback((reviews: IReview[] | undefined) => {
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    return reviews.reduce((acc, next) => acc + next.rating, 0);
  }, []);

  const score = useMemo(() => {
    const totalRating = calculateTotalRating([]);
    return totalRating / ([]?.length || 1);
  }, [calculateTotalRating]);

  const ratingCount = useMemo(() => calculateTotalRating([]), [calculateTotalRating]);

  if (filmStatus === ApiStatusPendingEnum.LOADING) {
    return <Spinner/>;
  }
  if (!film) {
    return <Page404/>;
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
        <p className="film-card__starring"><strong>Starring: {film?.starring?.join(', ')}</strong></p>
      </div>
    </div>
  );

};

export const OverviewMemo = memo(Overview);
