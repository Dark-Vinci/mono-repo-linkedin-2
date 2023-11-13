import React from "react";

import styles from "./user-home-card.module.scss";
import type { UserHomeCardProps } from "@types";

export function UserHomeCard({
  profileUrl,
  backgroundImage,
  fullName,
  title,
  profileViewers,
  connections,
}: UserHomeCardProps): JSX.Element {
  return (
    <div className={styles.container}>
      <div className="top">
        <div className="top_container">
          <div
            className="header"
            style={{
              backgroundImage,
            }}
          ></div>

          <div className="img">
            <img src={profileUrl} alt="profile-url" />
          </div>
          <div className="name">{fullName}</div>
          <div className="title">{title}</div>
        </div>
      </div>

      <div className="middle">
        <div className="middle_container">
          <div className="profile_viewer">
            <div className="profile_viewers">
              <p>Profile viewers</p>
              <p>{profileViewers}</p>
            </div>

            <div className="connections">
              <div>
                <p>Connections</p>
                <p>{connections}</p>
              </div>

              <div>manage your network</div>
            </div>
          </div>
          <div className="container"></div>
        </div>
      </div>

      <div className="lower">
        <div className="lower_container">
          <p></p>
          <div className="premium">
            <div className="icon"></div>
            <p>
              <a href=".">Try Premium For Free</a>
            </p>
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
