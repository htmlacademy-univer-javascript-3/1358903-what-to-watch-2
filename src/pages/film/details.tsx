import { FC, Fragment, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store.ts';
import { selectFilmsData, selectFilmsError, selectFilmsStatus } from '../../store/films/film-selectors.ts';
import { Page404 } from '../page-404/page-404.tsx';
import { Spinner } from '../../components/spinner/spinner.tsx';


const Details: FC = () => {
  const params = useParams();
  const films = useAppSelector(selectFilmsData);
  const filmsError = useAppSelector(selectFilmsError);
  const filmsStatus = useAppSelector(selectFilmsStatus);

  const film = films?.find((f) => f.id === params.id);


  if (filmsError) {
    return <Page404/>;
  }

  if (!films || filmsStatus === 'LOADING') {
    return <Spinner/>;
  }

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{film?.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {film?.starring?.map((actor, index) => (
              actor && (
                <Fragment key={actor}>
                  {actor}
                  {index < film?.starring?.length - 1 && <br />}
                </Fragment>
              )
            ))}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{film?.runTime}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{film?.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{film?.released}</span>
        </p>
      </div>
    </div>
  );

};

export const DetailsMemo = memo(Details);
