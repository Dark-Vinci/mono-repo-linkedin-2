import { createContext } from 'react';

export const UIStates = createContext({
  isDarkMode: false,
  isMobile: true,
  modalOpened: false,
  isFirstTimer: true,
  from: new Date(),
  scrollHeight: 0,
});
