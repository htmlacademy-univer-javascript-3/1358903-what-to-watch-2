import { Link, useParams } from 'react-router-dom';


export const Play = () => {
  const { id = ''} = useParams();
  return (<Link to={`/player/${id}`} className="btn btn--play film-card__button" type="button">
    <svg viewBox="0 0 19 19">
      <use xlinkHref="#play-s" />
    </svg>
    <span>Play</span>
  </Link>);
};
