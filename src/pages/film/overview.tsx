import { FC, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { films } from '../../mocks/films.ts';
import { IReview } from '../../types/IReview.ts';


export const Overview: FC = () => {
  const params = useParams();
  const film = films.find((f) => f.id === params.id);

  const calculateTotalRating = useCallback((reviews: IReview[] | undefined) => {
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    return reviews.reduce((acc, next) => acc + next.rating, 0);
  }, []);

  const score = useMemo(() => {
    const totalRating = calculateTotalRating(film?.reviews);
    return totalRating / (film?.reviews?.length || 1); // Используем 1, чтобы избежать деления на 0
  }, [calculateTotalRating, film?.reviews]);

  const ratingCount = useMemo(() => calculateTotalRating(film?.reviews), [calculateTotalRating, film?.reviews]);

  return (<div className="film-card__desc">

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
      <p className="film-card__starring"><strong>Starring: Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other</strong></p>
    </div>
  </div>);
};

