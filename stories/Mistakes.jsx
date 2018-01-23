import React from 'react';
import { storiesOf } from '@storybook/react';

import Mistakes from '../src/components/mistakes/Mistakes';

storiesOf('Mistakes', module)
    .add('Default', () => <Mistakes mistakes={[]} />);
