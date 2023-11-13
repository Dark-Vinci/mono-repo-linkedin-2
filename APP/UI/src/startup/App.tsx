import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import styles from '../styles/App.module.scss';
import { router } from '../router';

function App() {
  useEffect(() => {
    //console.log (application mount)
    console.log({message: 'application mount'})
  }, []);

  return (
    <div className={styles.App}>
      this is the
      <RouterProvider
        router={router}
        fallbackElement={<div>here</div>}
      />
    </div>
  );
}

export default App;
