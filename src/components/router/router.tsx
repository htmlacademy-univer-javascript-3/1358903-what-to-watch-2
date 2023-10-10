import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FilmList} from "../film-list/film-list.tsx";
import {Film} from "../../pages/film/film.tsx";
import {FC} from "react";
import {Main} from "../../pages/main/main.tsx";


export const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>

        <Route path="/films" element={<FilmList />}/>
        <Route path="/films/:id" element={<Film />}/>

        <Route path="*" element={<Main/>} />
      </Routes>
    </BrowserRouter>
  );
};
