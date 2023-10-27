import React from 'react';
import { ECatalog } from '../../types/ECatalog.ts';

interface GenresItem {
  catalog: ECatalog;
  setGenre: (newGenre: ECatalog) => () => void;
  isActive: boolean;
}
export const GenresItem: React.FC<GenresItem> = ({
  catalog, setGenre, isActive
}) => (
  <li
    className={`catalog__genres-item ${isActive ? 'catalog__genres-item--active' : ''}`}
    key={catalog}
  >
    <div
      onClick={setGenre(catalog)}
      className="catalog__genres-link"
    >
      {catalog}
    </div>
  </li>
);

