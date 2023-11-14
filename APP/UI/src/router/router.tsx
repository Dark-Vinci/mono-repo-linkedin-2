import { createBrowserRouter } from 'react-router-dom';
import React from 'react';

import { Home, Jobs, Me, Messaging, Notification, Page404 } from '@pages';

export const router = createBrowserRouter([
  {
    path: '/me',
    element: <Me />,
  },
  {
    path: '/messaging',
    element: <Messaging />,
  },
  {
    path: '/jobs',
    element: <Jobs />,
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/notification',
    element: <Notification />
  },
  {
    path: '*',
    element: <Page404/>,
  }
]);
