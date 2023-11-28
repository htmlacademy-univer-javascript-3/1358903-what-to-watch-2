import { FC, useCallback, useEffect } from 'react';
import Logo from '../../components/logo/logo.tsx';
import UserBlock from '../../components/user-block/user-block.tsx';
import { Breadcrumbs } from './breadcrumbs.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { RatingStars } from '../../components/rating-stars/rating-stars.tsx';
import { FormAddReview } from '../../types/form-add-review.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { Page404 } from '../page-404/page-404.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import {
  selectFilmData, selectFilmError, selectFilmStatus
} from '../../store/films/film-selectors.ts';
import { Spinner } from '../../components/spinner/spinner.tsx';
import { addReview, fetchFilm } from '../../store/api-actions.ts';
export const AddReview: FC = () => {
  const { id } = useParams();
  const film = useAppSelector(selectFilmData);
  const filmError = useAppSelector(selectFilmError);
  const filmStatus = useAppSelector(selectFilmStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (id) {
      dispatch(fetchFilm(id));
    }
  }, [id, dispatch]);

  const methods = useForm<FormAddReview>({
    defaultValues: {
      rating: 1,
      text: '',
    },
  });

  const {
    handleSubmit,
    setValue,
    control,
  } = methods;


  const onSubmitForm = useCallback((data: FormAddReview) => {
    if (!film?.id) {
      return;
    }
    dispatch(
      addReview({ filmId: film.id, rating: +data.rating, comment: data.text })
    );
    navigate(`/films/${film.id}`);
  }, [dispatch, film?.id, navigate]);

  const setTextValue = useCallback((value: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue('text', value?.target.value);
  }, [setValue]);

  const setRatingValue = useCallback((value: number) => {
    setValue('rating', value);
  }, [setValue]);

  if (filmError) {
    return <Page404/>;
  }

  if (!film || filmStatus === 'LOADING') {
    return <Spinner/>;
  }

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    void handleSubmit(onSubmitForm)(event);
  };

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.previewImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />
          <Breadcrumbs film={film}/>
          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img
            src={film.previewImage}
            alt={film.name}
            width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmitForm} action="#" className="add-review__form">
            <div className="rating">
              <RatingStars onChangeRating={setRatingValue} control={control}/>
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
