import {FC} from 'react';
import { useParams } from 'react-router-dom';
import { Page404 } from '../page-404/page-404.tsx';
import { useAppSelector } from '../../hooks/store.ts';
import { selectFilmsData, selectFilmsError, selectFilmsStatus } from '../../store/films/film-selectors.ts';
import { Spinner } from '../../components/spinner/spinner.tsx';

export const Player: FC = () => {
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

  return (<div>
    {
      film ?
        <div className="player">
          <video src="#" className="player__video" poster="img/player-poster.jpg"></video>

          <button type="button" className="player__exit">Exit</button>

          <div className="player__controls">
            <div className="player__controls-row">
              <div className="player__time">
                <progress className="player__progress" value="30" max="100"></progress>
                <div className="player__toggler" style={{ left: '30%' }}>Toggler</div>
              </div>
              <div className="player__time-value">1:30:29</div>
            </div>

            <div className="player__controls-row">
              <button type="button" className="player__play">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <div className="player__name">Transpotting</div>

              <button type="button" className="player__full-screen">
                <svg viewBox="0 0 27 27" width="27" height="27">
                  <use xlinkHref="#full-screen"></use>
                </svg>
                <span>Full screen</span>
              </button>
            </div>
          </div>
        </div>
        : <Page404/>
    }
  </div>);
};
