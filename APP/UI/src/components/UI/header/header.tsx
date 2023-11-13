import React from 'react';

import styles from './header.module.scss';

interface HomeProps {
    name: string;
}

export function Header(props: HomeProps): JSX.Element {
    return (
        <div className={styles.container}>
            <div className = {styles.left}>
                <div className= { styles.left_container }>
                    <div className= { styles.input }>
                        <div className={ styles.logo }></div>
                        <div className={ styles.search }>
                            <input type="text" />
                        </div>
                    </div>

                    <div className={ styles.icons }>
                        <div className={ styles.icon_container }>
                            <div className={styles.home }>
                                <p>logo</p>
                                <div className="p">home</div>
                            </div>

                            <div className={ styles.networks }>
                                <p>logo</p>
                                <div className="p">my network</div>
                            </div>

                            <div className={ styles.jobs }>
                                <p>logo</p>
                                <div className="p">jobs</div>
                            </div>

                            <div className="messaging">
                                <p>logo</p>
                                <div className="p">messaging</div>
                            </div>

                            <div className={ styles.notifications }>
                                <p>logo</p>
                                <div className="p">notifications</div>
                            </div>

                            <div className="me">
                                <p>logo</p>
                                <div className="p">me</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={ styles.right }>
                <div className={ styles.right_container }>
                    <div className={ styles.for_business }>
                        <p>logo</p>
                        <p>for business</p>
                    </div>
                    <div className={ styles.job_post }>
                        <p>logo</p>
                        <p>post a job for free</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
