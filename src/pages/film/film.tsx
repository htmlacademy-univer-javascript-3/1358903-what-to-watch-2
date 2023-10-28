import {FC} from 'react';
import { films } from '../../mocks/films.ts';
import { useParams } from 'react-router-dom';
import Logo from '../../components/logo/logo.tsx';
import UserBlock from '../../components/user-block/user-block.tsx';
import { Buttons } from '../../components/button/buttons.ts';
import { Tabs } from '../../components/tabs/tabs.tsx';
import { ITab } from '../../components/tabs/types.ts';
import { Overview } from './overview.tsx';
import { Details } from './details.tsx';
import { Reviews } from './reviews.tsx';
import { LikeThis } from '../../components/like-this/like-this.tsx';


export const Film: FC = () => {
  const params = useParams();
  const film = films.find((f) => f.id === params.id);


  const tabs: ITab[] = [
    {
      label: 'Overview',
      component: <Overview />
    },
    {
      label: 'Details',
      component: <Details />
    },
    {
      label: 'Reviews',
      component: <Reviews />
    }
  ];

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
              <Tabs tabs={tabs} />
            </div>
          </div>
        </div>
      </section>

      <LikeThis genre={film?.genre}/>
    </>
  );
};
