import { FC, useCallback } from 'react';
import Logo from '../../components/logo/logo.tsx';
import UserBlock from '../../components/user-block/user-block.tsx';
import { Breadcrumbs } from './breadcrumbs.tsx';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { RatingStars } from '../../components/rating-stars/rating-stars.tsx';
import { FormAddReview } from '../../types/form-add-review.ts';
import { useParams } from 'react-router-dom';
import { Page404 } from '../page-404/page-404.tsx';
import { useAppSelector } from '../../hooks/store.ts';
import { selectFilmsData, selectFilmsError, selectFilmsStatus } from '../../store/films/film-selectors.ts';
import { Spinner } from '../../components/spinner/spinner.tsx';
export const AddReview: FC = () => {

  const params = useParams();
  const films = useAppSelector(selectFilmsData);
  const filmsError = useAppSelector(selectFilmsError);
  const filmsStatus = useAppSelector(selectFilmsStatus);
  const film = films?.find((f) => f.id === params.id);

  const methods = useForm<FormAddReview>({
    defaultValues: {
      rating: 1,
      text: '',
    },
  });

  const {
    handleSubmit,
    setValue
  } = methods;


  const onSubmit: SubmitHandler<FormAddReview> = useCallback((data) => {
    console.log(data);
  }, []);

  const setTextValue = useCallback((value: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue('text', value?.target.value);
  }, [setValue]);

  const setRatingValue = useCallback((value: number) => {
    setValue('rating', value);
  }, [setValue]);

  if (filmsError) {
    return <Page404/>;
  }

  if (!films || filmsStatus === 'LOADING') {
    return <Spinner/>;
  }


  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film?.previewImage} alt={film?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />
          <Breadcrumbs film={film}/>
          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img
            src={film?.previewImage}
            alt={film?.name}
            width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} action="#" className="add-review__form">
            <div className="rating">
              <RatingStars onChangeRating={setRatingValue}/>
            </div>

            <div className="add-review__text">
              <textarea onChange={setTextValue} className="add-review__textarea" name="text" id="review-text" placeholder="Review text">
              </textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit">Post</button>
              </div>

            </div>
          </form>
        </FormProvider>
      </div>

    </section>
  );
};
