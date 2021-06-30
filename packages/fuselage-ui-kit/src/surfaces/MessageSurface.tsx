import { Margins } from '@rocket.chat/fuselage';
import React, { FC } from 'react';

import { Surface } from './SurfaceContext';

const value = {
  type: 'message',
} as const;

const MessageSurface: FC = ({ children }) => (
  <Surface value={value}>
    <Margins blockEnd='x16'>{children}</Margins>
  </Surface>
);

export default MessageSurface;
