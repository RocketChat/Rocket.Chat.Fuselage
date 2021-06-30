import { Margins } from '@rocket.chat/fuselage';
import React, { FC } from 'react';

import { Surface } from './SurfaceContext';

const value = {
  type: 'banner',
} as const;
const BannerSurface: FC = ({ children }) => (
  <Surface value={value}>
    <Margins block='x8'>{children}</Margins>
  </Surface>
);

export default BannerSurface;
