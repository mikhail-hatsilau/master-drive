import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from 'lodash/fp';

import { routes } from '../../constants';

import styles from './Navigation.scss';

const { FOLDERS, MISTAKES } = routes;

const handleClick = onNavigationChanged => path => (event) => {
    onNavigationChanged(path);
    event.preventDefault();
};

const getActiveClass = currentRoute => linkRoute =>
    classnames({ [styles.active]: currentRoute === linkRoute });

/* eslint-disable jsx-a11y/anchor-is-valid */

const Navigation = ({ activeRoute, onNavigationChanged = noop }) => {
    const handleClickWithProps = handleClick(onNavigationChanged);
    const getActiveClassForRoute = getActiveClass(activeRoute);
    return (
        <nav className={styles.navigation}>
            <ul>
                <li className={getActiveClassForRoute(FOLDERS)}>
                    <a href="" onClick={handleClickWithProps(FOLDERS)}>
                        Folders and files
                    </a>
                </li>
                <li className={getActiveClassForRoute(MISTAKES)}>
                    <a href="" onClick={handleClickWithProps(MISTAKES)}>
                        Mistakes management
                    </a>
                </li>
            </ul>
        </nav>
    );
};

Navigation.propTypes = {
    onNavigationChanged: PropTypes.func,
    activeRoute: PropTypes.oneOf([FOLDERS, MISTAKES]),
};

export default Navigation;
