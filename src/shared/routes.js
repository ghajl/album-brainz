import React from 'react';
import { Redirect } from 'react-router-dom';
import { Main, MyAlbums, AlbumDetails, NotFound } from '../client/pages';
import Root from '../client/Root';

const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: () => <Redirect to="/search" />
      },
      {
        path: '/search',
        component: Main
      },
      {
        path: '/my-albums',
        component: MyAlbums
      },
      {
        path: '/album-details/:id',
        component: AlbumDetails
      },
      {
        component: NotFound
      }
    ]
  }
];

export default routes;
