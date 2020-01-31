import React from 'react';
import {
  Field,
  FieldGroup,
} from '@rocket.chat/fuselage';
import {
  BLOCK_CONTEXT,
} from '@rocket.chat/ui-kit';

import { Block } from './Block';

export const Input = ({ label, element, parser, index, error, hint }) => (
  <Block>
    <FieldGroup>
      <Field>
        {label && <Field.Label>{label}</Field.Label>}
        {parser.renderInputs(element, BLOCK_CONTEXT.FORM, parser, index)}
        {error && <Field.Error>{error}</Field.Error>}
        {hint && <Field.Hint>{hint}</Field.Hint>}
      </Field>
    </FieldGroup>
  </Block>
);
