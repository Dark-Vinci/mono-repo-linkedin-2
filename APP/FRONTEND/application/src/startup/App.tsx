// import React, { useEffect } from 'react';
// import { RouterProvider } from 'react-router-dom';
//
// import router from '../router';
// import './styles/variables.css';
// import { Colors } from '../utils/constants/style';
//
// export function App() {
//   useEffect(() => {
//     const el = getComputedStyle(document.documentElement);
//     const a = el.getPropertyValue(CSSProperties.MAIN_COLOR);
//
//     el.setProperty(CSSProperties.MAIN_COLOR, Colors.BLACK);
//
//     console.log({ a });
//     return () => {
//       console.log('final cleanup work');
//     };
//   }, []);
//
//   return (
//     <RouterProvider
//       router={router({ isVerified: false })}
//       fallbackElement={<div>WEB-APP</div>}
//     />
//   );
// }
export {};
