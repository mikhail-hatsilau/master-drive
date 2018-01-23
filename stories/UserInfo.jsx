import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import UserInfo from '../src/components/userInfo/UserInfo';

storiesOf('UserInfo', module)
    .addDecorator(withKnobs)
    .add('Default', () => <UserInfo email={text('User email', 'mail@mail.com')} />);
