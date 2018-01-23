import React from 'react';
import { storiesOf } from '@storybook/react';

import FoldersContainer from '../src/components/folders/FoldersContainer';

storiesOf('FoldersContainer', module)
    .add('Default', () => <FoldersContainer />);
