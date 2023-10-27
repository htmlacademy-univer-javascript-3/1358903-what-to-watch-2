import {FC} from 'react';
import { films } from '../../mocks/films.ts';
import { useParams } from 'react-router-dom';
import Logo from '../../components/logo/logo.tsx';
import UserBlock from '../../components/user-block/user-block.tsx';
import { Buttons } from '../../components/button/buttons.ts';
import LikeThis from '../../components/like-this/like-this.tsx';


export const Film: FC = () => {
  const params = useParams();
  const film = films.find((f) => f.id === params.id);

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img
              src={film?.imageUrl}
              alt={film?.title}
            />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />
            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film?.title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">
                  {film?.genre}
                </span>
                <span className="film-card__year">
                  {film?.year}
                </span>
              </p>

              <div className="film-card__buttons">
                <Buttons.Play id={film?.id} />
                <Buttons.MyListButton count={12} />
                <Buttons.AddReview id={film?.id} />
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={film?.imageUrl}
                alt={film?.title}
                width="218"
                height="327"
              />
            </div>
            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className="film-nav__item film-nav__item--active">
                    <a href="#" className="film-nav__link">Overview</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="#" className="film-nav__link">Details</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="#" className="film-nav__link">Reviews</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <LikeThis ids={['1', '2']} />
    </>
  );
};
