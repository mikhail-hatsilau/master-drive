import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { invert } from 'lodash/fp';

import Navigation from '../src/components/navigation/Navigation';
import { routes } from '../src/constants';

storiesOf('Navigation', module)
    .addDecorator(withKnobs)
    .add('Default', () => <Navigation activeRoute={select('Routes', invert(routes))} />);
