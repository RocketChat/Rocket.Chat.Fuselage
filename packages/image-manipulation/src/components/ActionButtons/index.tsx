import { ButtonGroup, ActionButton } from '@rocket.chat/fuselage';
import React from 'react';

const ActionButtons = () => (
  <ButtonGroup>
    <ActionButton ghost icon='check' />
    <ActionButton ghost icon='cross' />
  </ButtonGroup>
);

export default ActionButtons;
