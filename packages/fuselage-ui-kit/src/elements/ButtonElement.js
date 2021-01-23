import { Button, Throbber } from '@rocket.chat/fuselage';
import React from 'react';

import { useUiKitState } from '../hooks';

const ButtonElement = ({ element, context, parser }) => {
  const [{ loading }, action] = useUiKitState(element, context);

  return (
    <Button
      disabled={loading}
      primary={element.style === 'primary'}
      danger={element.style === 'danger'}
      minWidth='4ch'
      small
      value={element.value}
      data-group={element.groupId}
      onClick={action}
    >
      {loading ? <Throbber /> : parser.plainText(element.text)}
    </Button>
  );
};

export default ButtonElement;
