
import { FC } from 'react';
import { films } from '../../mocks/films';
import { SmallFilmCard } from '../small-film-card/small-film-card.tsx';
import { Footer } from '../footer/footer.tsx';

interface ILikeThis {
  ids: string[];
}
export const LikeThis: FC<ILikeThis> = ({ ids }) => (
  <div className="page-content">
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>
      <div className="catalog__films-list">
        {films.filter((f) => ids.includes(f.id)).map((film) => (
          <SmallFilmCard film={film} key={film.id} />
        ))}
      </div>
    </section>
    <Footer />
  </div>
);

export default LikeThis;
