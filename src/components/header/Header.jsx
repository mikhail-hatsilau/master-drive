import React from 'react';

import UserInfoContainer from '../userInfo/UserInfoContainer';

import styles from './Header.scss';

const Header = () => (
    <div className={styles.header}>
        <UserInfoContainer />
    </div>
);

export default Header;
