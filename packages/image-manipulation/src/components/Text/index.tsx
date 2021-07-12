import { ActionButton, Box } from '@rocket.chat/fuselage';
import React, { ComponentProps } from 'react';

type TextProps = ComponentProps<typeof Box>;

export const Text = (props: TextProps) => (
  <ActionButton ghost icon='star' {...props} />
);
