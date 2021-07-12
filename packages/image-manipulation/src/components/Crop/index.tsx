import { Box, ActionButton } from '@rocket.chat/fuselage';
import React, { ComponentProps } from 'react';

type CropProps = ComponentProps<typeof Box>;

export const Crop = (props: CropProps) => (
  <ActionButton ghost icon='star' {...props} />
);
