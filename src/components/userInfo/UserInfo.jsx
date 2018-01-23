import React from 'react';
import PropTypes from 'prop-types';

import styles from './UserInfo.scss';

const UserInfo = ({ email = '' }) => (
    <div>
        You have entered as
        <span className={styles.email}>
            { email }
        </span>
    </div>
);

UserInfo.propTypes = {
    email: PropTypes.string,
};

export default UserInfo;
