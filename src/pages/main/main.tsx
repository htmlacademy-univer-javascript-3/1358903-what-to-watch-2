import {FC} from 'react';
import { Footer } from '../../components/footer/footer.tsx';
import { films } from '../../mocks/films.ts';
import { FilmCard } from '../../components/film-card/film-card.tsx';
import { Catalog } from '../../components/catalog/catalog.tsx';

export const Main: FC = () => (<>
  <FilmCard film={films[0]} />

  <div className="page-content">
    <Catalog withGenres />
    <Footer/>
  </div>
</>

);
