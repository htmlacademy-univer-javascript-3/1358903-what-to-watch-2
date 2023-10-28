import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { films } from '../../mocks/films.ts';


export const Details: FC = () => {
  const params = useParams();
  const film = films.find((f) => f.id === params.id);

  return (<div className="film-card__text film-card__row">
    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Director</strong>
        <span className="film-card__details-value">{film?.director}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Starring</strong>
        <span className="film-card__details-value">
          {(film?.actors || []).map((actor, index) => (
            film?.actors && (
              <React.Fragment key={actor}>
                {actor}
                {index < film?.actors.length - 1 && <br />}
              </React.Fragment>
            )
          ))}
        </span>
      </p>
    </div>

    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Run Time</strong>
        <span className="film-card__details-value">{film?.duration}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Genre</strong>
        <span className="film-card__details-value">{film?.genre}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Released</strong>
        <span className="film-card__details-value">{film?.year}</span>
      </p>
    </div>
  </div>
  );

};
