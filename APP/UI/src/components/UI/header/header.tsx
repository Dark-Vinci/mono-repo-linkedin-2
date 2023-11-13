import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import type { InputEvent } from '@types';

import styles from './header.module.scss';

interface HomeProps {
    name: string;
    profileUrl: string;
}

function navState(isActive: boolean, isPending: boolean): string {
    if (isActive) {
        return "nav.active";
    }

    if (isPending) {
        return "nav.pending";
    }

    return "";
}

export function Header({ profileUrl }: HomeProps): JSX.Element {
    const [input, setInput] = useState<string>('');

    const inputChangeHandler = (event: InputEvent) => {
        setInput(event.target.value);
    };

    return (
        <div className={styles.container}>
            <div className = {styles.left}>
                <div className= { styles.left_container }>
                    <div className= { styles.input }>
                        <div className={ styles.logo }></div>
                        <div className={ styles.search }>
                            <input 
                                type="text"
                                value={input}
                                onChange={ inputChangeHandler }
                            />
                        </div>
                    </div>

                    <div className={ styles.icons }>
                        <div className={ styles.icon_container }>
                            <div className={styles.home }>
                                <NavLink
                                    to='/home'
                                    className={({isActive, isPending}) => {
                                        return navState(isActive, isPending)
                                    }}
                                >
                                    <p>logo</p>
                                    <div className="p">home</div>
                                </NavLink>
                            </div>

                            <div className={ styles.networks }>
                                <NavLink
                                    to='/my-network'
                                    className={({isActive, isPending}) => {
                                        return navState(isActive, isPending)
                                    }}
                                >
                                    <p>logo</p>
                                    <div className="p">my network</div>
                                </NavLink>
                            </div>

                            <div className={ styles.jobs }>
                                <NavLink
                                    to='/jobs'
                                    className={({isActive, isPending}) => {
                                        return navState(isActive, isPending)
                                    }}
                                >
                                    <p>logo</p>
                                    <div className="p">jobs</div>
                                </NavLink>
                            </div>

                            <div className="messaging">
                                <NavLink
                                    to='/messaging'
                                    className={({isActive, isPending}) => {
                                        return navState(isActive, isPending)
                                    }}
                                >
                                    <p>logo</p>
                                    <div className="p">messaging</div>
                                </NavLink>
                            </div>

                            <div className={ styles.notifications }>
                                <NavLink
                                    to='/notifications'
                                    className={({isActive, isPending}) => {
                                        return navState(isActive, isPending)
                                    }}
                                >

                                </NavLink>
                                <p>logo</p>
                                <div className="p">notifications</div>
                            </div>

                            <div className="me">
                                <NavLink
                                    to='/me'
                                    className={({isActive, isPending}) => {
                                        return navState(isActive, isPending)
                                    }}
                                >
                                    <div className="img">
                                        <img 
                                            src={profileUrl} 
                                            alt="profileimage" 
                                        />
                                    </div>
                                    <div className="p">me</div>
                                </NavLink>
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
