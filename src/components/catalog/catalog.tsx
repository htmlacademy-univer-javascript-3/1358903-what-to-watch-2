import { films } from '../../mocks/films.ts';
import { FC, useCallback, useState } from 'react';
import { GenresItem } from './genres-item.tsx';
import { eCatalogValues } from '../../types/ECatalog.ts';
import { SmallFilmCard } from '../small-film-card/small-film-card.tsx';

interface ICatalog {
  withGenres?: boolean;
}
export const Catalog: FC<ICatalog> = ({withGenres}) => {
  const [genre, setGenre] = useState<string>();


  const handleSetGenre = useCallback((value: string) => () => {
    setGenre(value);
  }, []);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      {
        withGenres
          ? eCatalogValues.map((catalog) => <GenresItem catalog={catalog} key={catalog} setGenre={handleSetGenre} isActive={catalog === genre}/>)
          : null
      }

      <div className="catalog__films-list">
        {
          films.map((film) => <SmallFilmCard key={film.id} film={film}/>)
        }
      </div>

      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    </section>
  );
};
