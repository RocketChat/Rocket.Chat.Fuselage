import React, { ComponentProps } from 'react';
import { ActionButton, Box } from '@rocket.chat/fuselage';

type CrossProps = ComponentProps<typeof Box>;

export const Cross = (props: CrossProps) => (
  <ActionButton ghost icon='cross' {...props} />
);
