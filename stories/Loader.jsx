import React from 'react';
import { storiesOf } from '@storybook/react';

import Loader from '../src/components/loader/Loader';

storiesOf('Loader', module)
    .add('Default', () => <Loader />);
