import React, { useState } from "react";

import type { HomeProps, InputEvent } from "@types";

import styles from "./header.module.scss";
import { Navigation } from "./navigation";

export function Header({ profileUrl }: HomeProps): JSX.Element {
  const [input, setInput] = useState<string>("");

  const inputChangeHandler = (event: InputEvent) => {
    setInput(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.left_container}>
          <div className={styles.input}>
            <div className={styles.logo}></div>
            <div className={styles.search}>
              <input type="text" value={input} onChange={inputChangeHandler} />
            </div>
          </div>

          <div className={styles.icons}>
            <Navigation 
                profileUrl={profileUrl} 
            />
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.right_container}>
          <div className={styles.for_business}>
            <p>logo</p>
            <p>for business</p>
          </div>
          <div className={styles.job_post}>
            <p>logo</p>
            <p>post a job for free</p>
          </div>
        </div>
      </div>
    </div>
  );
}
