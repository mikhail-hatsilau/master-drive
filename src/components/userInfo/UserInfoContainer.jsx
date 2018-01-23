import React, { Component } from 'react';

import UserInfo from './UserInfo';
import { loadCurrentUserEmail } from '../../api';

class UserInfoContainer extends Component {
    state = {
        email: '',
    };

    async componentDidMount() {
        const email = await loadCurrentUserEmail();
        this.setState({
            email,
        });
    }

    render() {
        const { email } = this.state;
        return <UserInfo email={email} />;
    }
}

export default UserInfoContainer;
