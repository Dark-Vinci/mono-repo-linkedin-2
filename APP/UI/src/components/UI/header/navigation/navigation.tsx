import React from "react";
import { NavLink } from "react-router-dom";

import { navState } from '@utils';
import { Pages, type UG } from '@types';

import styles from './navigation.module.scss';

export function Navigation({ profileUrl }: UG): JSX.Element {
  return (
    <div className={ styles.container }>
      <div className={styles.icon_container}>
        <div className={styles.home}>
          <NavLink
            to={Pages.HOME}
            className={({ isActive, isPending }) => {
              return navState(isActive, isPending);
            }}
          >
            <p>logo</p>
            <div className="p">home</div>
          </NavLink>
        </div>

        <div className={styles.networks}>
          <NavLink
            to={Pages.MY_NETWORK}
            className={({ isActive, isPending }) => {
              return navState(isActive, isPending);
            }}
          >
            <p>logo</p>
            <div className="p">my network</div>
          </NavLink>
        </div>

        <div className={styles.jobs}>
          <NavLink
            to={Pages.JOB}
            className={({ isActive, isPending }) => {
              return navState(isActive, isPending);
            }}
          >
            <p>logo</p>
            <div className="p">jobs</div>
          </NavLink>
        </div>

        <div className="messaging">
          <NavLink
            to={Pages.MESSAGING}
            className={({ isActive, isPending }) => {
              return navState(isActive, isPending);
            }}
          >
            <p>logo</p>
            <div className="p">messaging</div>
          </NavLink>
        </div>

        <div className={styles.notifications}>
          <NavLink
            to={Pages.NOTIFICATION}
            className={({ isActive, isPending }) => {
              return navState(isActive, isPending);
            }}
          >
            <p>logo</p>
            <div className="p">notifications</div>
          </NavLink>
        </div>

        <div className="me">
          <NavLink
            to={Pages.ME}
            className={({ isActive, isPending }) => {
              return navState(isActive, isPending);
            }}
          >
            <div className="img">
              <img src={profileUrl} alt="profileimage" />
            </div>
            <div className="p">me</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
