
import { FC } from 'react';
import { films } from '../../mocks/films';
import { SmallFilmCard } from '../small-film-card/small-film-card.tsx';
import { Footer } from '../footer/footer.tsx';

interface ILikeThis {
  genre?: string;
}
export const LikeThis: FC<ILikeThis> = ({ genre}) => {

  const filmLikeThis = films.filter((film) => film.genre === genre).slice(0, 4);

  return (<div className="page-content">
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>
      <div className="catalog__films-list">
        {filmLikeThis.map((film) => (
          <SmallFilmCard film={film} key={film.id} />
        ))}
      </div>
    </section>
    <Footer />
  </div>);
};


