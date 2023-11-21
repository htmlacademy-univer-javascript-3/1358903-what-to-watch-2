import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store.ts';
import { selectFilmsData, selectFilmsError, selectFilmsStatus } from '../../store/films/film-selectors.ts';
import { Page404 } from '../page-404/page-404.tsx';
import { Spinner } from '../../components/spinner/spinner.tsx';


export const Details: FC = () => {
  const params = useParams();
  const films = useAppSelector(selectFilmsData);
  const filmsError = useAppSelector(selectFilmsError);
  const filmsStatus = useAppSelector(selectFilmsStatus);

  const film = films?.find((f) => f.id === params.id);


  if (filmsError || !film) {
    return <Page404/>;
  }

  if (!films || filmsStatus === 'LOADING') {
    return <Spinner/>;
  }
  // TODO в след. задаче
  return (<div className="film-card__text film-card__row">
    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Director</strong>
        {/*<span className="film-card__details-value">{film?.director}</span>*/}
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Starring</strong>
        <span className="film-card__details-value">
          {/*{([])?.map((actor, index) => (*/}
          {/*  film?.actors && (*/}
          {/*    <React.Fragment key={actor}>*/}
          {/*      {actor}*/}
          {/*      {index < film?.actors.length - 1 && <br />}*/}
          {/*    </React.Fragment>*/}
          {/*  )*/}
          {/*))}*/}
        </span>
      </p>
    </div>

    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Run Time</strong>
        {/*<span className="film-card__details-value">{film?.duration}</span>*/}
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Genre</strong>
        <span className="film-card__details-value">{film?.genre}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Released</strong>
        {/*<span className="film-card__details-value">{film?.year}</span>*/}
      </p>
    </div>
  </div>
  );

};
