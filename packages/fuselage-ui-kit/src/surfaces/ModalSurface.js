import { Margins } from '@rocket.chat/fuselage';
import React from 'react';

import { Surface } from './SurfaceContext';

const ModalSurface = ({ children }) => (
  <Surface type='modal'>
    <Margins blockEnd='x16'>{children}</Margins>
  </Surface>
);

export default ModalSurface;
