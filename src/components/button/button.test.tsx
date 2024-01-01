// import { createAPI } from '../../services/api';
// import thunk, { ThunkDispatch } from 'redux-thunk';
// import { configureMockStore } from '@jedmao/redux-mock-store';
// import { Action } from '@reduxjs/toolkit';
// import { render, screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
//
// import { ToMyListButton } from './to-my-list-button';
// import { ApiStatusPendingEnum, EReducers } from "../../types/api.ts";
// import { RootState } from "../../store";
// import { testFilms } from "../../mocks/mocks.ts";
// import { test } from "vitest";
// import { Buttons } from "./buttons.ts";
// import { MyListButton } from "./my-list-button.tsx";
//
// const api = createAPI();
// const middlewares = [thunk.withExtraArgument(api)];
// const mockStore = configureMockStore<
//   RootState,
//   Action,
//   ThunkDispatch<RootState, typeof api, Action>
// >(middlewares);
// const store = mockStore({
//   [EReducers.Auth]: {
//     authorizationStatus: {
//       apiData: true,
//       apiError: false,
//       apiStatus: ApiStatusPendingEnum.LOAD
//     },
//     user: {
//       apiData: {
//         email:'tomilin229@gmail.com',
//         token:'dG9taWxpbjIyOUBnbWFpbC5jb20=',
//         name:'tomilin229',
//         avatarUrl:'https://13.design.htmlacademy.pro/static/avatar/3.jpg' ,
//       },
//       apiStatus: null,
//       apiError: null,
//     },
//   },
//   [EReducers.Films]: {
//     film: {
//       apiData: testFilms[0],
//       apiError: false,
//       apiStatus: ApiStatusPendingEnum.LOAD
//     },
//     reviews: {
//       apiData: null,
//       apiStatus: null,
//       apiError: null,
//     },
//     similar: {
//       apiData: null,
//       apiStatus: null,
//       apiError: null,
//     },
//     favoriteFilms: {
//       apiData: [],
//       apiStatus: ApiStatusPendingEnum.LOAD,
//       apiError: null,
//     },
//   }
// });
//
// describe('ToMyListButton', () => {
//   it('should render correctly', () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Buttons.MyListButton filmId={testFilms[0]?.id}/>
//         </BrowserRouter>
//       </Provider>);
//
//     expect(screen.getByText('My list')).toBeInTheDocument();
//   });
//
//   it('should render correctly, when add', () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Buttons.AddReview filmId={testFilms[0]?.id}/>
//         </BrowserRouter>
//       </Provider>);
//
//     expect(screen.getByTestId('add')).toBeInTheDocument();
//   });
//
//   it('should render correctly, when film in favorite list', () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <MyListButton filmId={testFilms[0]?.id}/>
//         </BrowserRouter>
//       </Provider>);
//
//     expect(screen.getByTestId('in-list')).toBeInTheDocument();
//   });
// });
