import { FC, useMemo } from 'react';
import { IReview } from '../../types/IReview.ts';
import { useParams } from 'react-router-dom';
import { films } from '../../mocks/films.ts';
import { Page404 } from '../page-404/page-404.tsx';


interface IReviewItem {
  review: IReview;
}
const Review: FC<IReviewItem> = ({review}) => (
  <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">{review?.text}</p>
      <footer className="review__details">
        <cite className="review__author">{review?.author}</cite>
        <time className="review__date" dateTime="Дата отзыва">{review?.author}</time>
      </footer>
    </blockquote>
    <div className="review__rating">{review?.rating}</div>
  </div>
);

interface IFilmCardReviewsColumn {
  reviews: IReview[];
}
const FilmCardReviewsColumn: FC<IFilmCardReviewsColumn> = ({ reviews }) => (
  <div className="film-card__reviews-col">
    {reviews.map((review, index) => (
      <Review key={index} review={review} />
    ))}
  </div>
);


export const Reviews: FC = () => {
  const params = useParams();
  const film = films.find((f) => f.id === params.id);

  const firstColumnReviews = useMemo(() => {
    if (film) {
      const halfIndex = Math.ceil(film?.reviews.length / 2);
      return film?.reviews.slice(0, halfIndex);
    }
    return [];
  }, [film]);

  const secondColumnReviews = useMemo(() => {
    if (film) {
      const halfIndex = Math.ceil(film?.reviews.length / 2);
      return film?.reviews.slice(halfIndex);
    }
    return [];
  }, [film]);

  return (<>
    {
      film
        ? <div className="film-card__reviews film-card__row">
          <FilmCardReviewsColumn reviews={firstColumnReviews} />
          <FilmCardReviewsColumn reviews={secondColumnReviews} />
          </div>
        : <Page404/>
    }
  </>
  );
};
