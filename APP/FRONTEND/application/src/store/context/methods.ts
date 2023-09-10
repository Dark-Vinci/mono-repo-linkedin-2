/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export const UIMethods = createContext({
  toggleDrawer: () => {},
  toggleModal: () => {},
  sendAnalytics: () => {},
  updateScrollHeight: () => {},
});
