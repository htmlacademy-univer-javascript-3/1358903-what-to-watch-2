import { FC } from 'react';
import { RatingInput } from './rating-input.tsx';


const ratings = [...Array(10).keys()].map((index) => index + 1).sort((a, b) => b - a);

interface IRatingStarsProps {
  onChangeRating: (value: number) => void;
}
export const RatingStars: FC<IRatingStarsProps> = ({onChangeRating}) => (
  <div className="rating__stars">
    {ratings.map((rating) => (
      <RatingInput
        key={rating}
        rating={rating}
        onChangeRating={onChangeRating}
      />))}
  </div>
);

