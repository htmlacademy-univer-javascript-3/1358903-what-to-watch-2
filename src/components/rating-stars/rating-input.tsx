import { FC, useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';


interface IRatingInput {
  rating: number;
  onChangeRating: (value: number) => void;
}
export const RatingInput: FC<IRatingInput> = ({
  rating, onChangeRating
}) => {

  const { control } = useFormContext();
  const watchRating: number = useWatch({
    control,
    name: 'rating',
  });

  const setRatingValue = useCallback((value: React.ChangeEvent<HTMLInputElement>) => {
    onChangeRating(Number(value.target.value));
  }, [onChangeRating]);

  return (<>
    <input
      className="rating__input"
      id={`star-${rating}`}
      type="radio"
      name="rating"
      value={rating}
      onChange={setRatingValue}
      checked={watchRating === rating}
    />
    <label className="rating__label" htmlFor={`star-${rating}`}>
      Rating {rating}
    </label>
  </>);
};
