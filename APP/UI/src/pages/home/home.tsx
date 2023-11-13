import React from 'react';

import styles from './home.module.scss';

export function Home(): JSX.Element {
    return (
        <div className={ styles.container }>
            <div className={ styles.header }>header</div>
            <div className={ styles.body }>
                <div className="left"></div>
                <div className="main"></div>
                <div className="right"></div>
            </div>
        </div>
    );
}
