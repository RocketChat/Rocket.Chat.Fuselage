import React, { ComponentProps } from 'react';
import { ActionButton, Box } from '@rocket.chat/fuselage';

type CheckProps = ComponentProps<typeof Box>;

export const Check = (props: CheckProps) => (
  <ActionButton ghost icon='check' {...props} />
);
