import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@router';
import styles from './App.module.scss';

function App() {
  useEffect(() => {
    //console.log (application mount)
    console.log({ message: 'application mount' });
  }, []);

  return (
    <div className={styles.App}>
      this is the
      <RouterProvider router={router} fallbackElement={<div>here</div>} />
    </div>
  );
}

export default App;
