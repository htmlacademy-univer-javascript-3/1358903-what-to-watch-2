import { Link, useParams } from 'react-router-dom';


export const AddReview = () => {
  const { id } = useParams();
  const filmId = id ?? '';
  return <Link to={`/films/${filmId}/review`} className="btn film-card__button">Add review</Link>;
};

