import React from 'react';

import styles from './user-home-card.module.scss';

interface UserHomeCardProps {
    readonly profileUrl: string;
    readonly fullName: string;
    readonly profileViewers: number;
    readonly connections: number;
    readonly title: string;
    readonly backgroundImage: string;
}

export function UserHomeCard({profileUrl, backgroundImage, fullName, title }: UserHomeCardProps): JSX.Element {
    return (
        <div className={styles.container}>
            <div className="top">
                <div className="top_container">
                    <div className="header"></div>
                    <div className="img">
                        <img src={ profileUrl } alt="profile-url" />
                    </div>
                    <div className="name">{ fullName }</div>
                    <div className="title">{ title }</div>
                </div>
            </div>

            <div className="middle">
                <div className="middle_container">
                    <div className="profile_viewer"></div>
                    <div className="container"></div>
                </div>
            </div>

            <div className="lower">
                <div className="lower_container">
                    <p></p>
                    <div className="premium">
                        <div className="icon"></div>
                        <p><a href=".">Try Premium For Free</a></p>
                    </div>
                </div>
            </div>

            <div className="footer">
                <div className="footer_container">
                    <div className="icon"></div>
                    <p>My Items</p>
                </div>
            </div>
        </div>
    );
}
