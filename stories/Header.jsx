import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from '../src/components/header/Header';

storiesOf('Header', module)
    .add('Default', () => <Header />);
