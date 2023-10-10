import {films} from "../../mocks/films.ts";
import {FilmCard} from "../film-card/film-card.tsx";
import {FC} from "react";

export const FilmList: FC = () => {

  return (
    <div className="catalog__films-list">
      {films.map((film) => {
        return (
          <FilmCard film={film}/>)
      })}

    </div>
  );
};
