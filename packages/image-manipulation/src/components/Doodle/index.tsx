import { ActionButton, Box } from '@rocket.chat/fuselage';
import React, { ComponentProps } from 'react';

type DoodleProps = ComponentProps<typeof Box>;

export const Doodle = (props: DoodleProps) => (
  <ActionButton ghost icon='pencil' {...props} />
);
