import { IReview } from './IReview.ts';
import { ECatalog } from './ECatalog.ts';


export type TFilm = {
  id: string;
  title: string;
  duration: string;
  year: string;
  views: string;
  director: string;
  imageUrl: string;
  videoUrl: string;
  description: string;
  genre: ECatalog;
  reviews: IReview[];
  actors?: string[];
}

