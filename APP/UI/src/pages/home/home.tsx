import React from 'react';

import styles from './home.module.scss';

export function Home(): JSX.Element {
    return (
        <div className={ styles.container }>
            <div className="header">header</div>
            <div className="body">body</div>
        </div>
    );
}
