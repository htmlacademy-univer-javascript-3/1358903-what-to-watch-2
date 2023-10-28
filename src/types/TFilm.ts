import { IReview } from './IReview.ts';


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
  genre: string;
  reviews: IReview[];
  actors?: string[];
}

