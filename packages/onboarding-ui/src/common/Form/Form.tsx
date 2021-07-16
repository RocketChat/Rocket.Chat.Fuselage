import { Box } from '@rocket.chat/fuselage';
import colors from '@rocket.chat/fuselage-tokens/colors.json';
import type { ReactElement, FC } from 'react';

const Form: FC<{ onSubmit: () => void }> = ({
  onSubmit,
  children,
}): ReactElement => (
  <Box
    is='form'
    backgroundColor={colors.white}
    color={colors.n800}
    padding={40}
    width='full'
    maxWidth={576}
    borderRadius={4}
    onSubmit={onSubmit}
  >
    {children}
  </Box>
);

export default Form;
