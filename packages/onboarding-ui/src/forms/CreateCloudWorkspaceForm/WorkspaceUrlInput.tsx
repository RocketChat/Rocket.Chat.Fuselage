import { Box, TextInput } from '@rocket.chat/fuselage';
import type { ComponentProps, ReactElement } from 'react';

type WorkspaceUrlInputProps = { domain: string } & ComponentProps<
  typeof TextInput
>;

const WorkspaceUrlInput = ({
  domain,
  ...props
}: WorkspaceUrlInputProps): ReactElement => (
  <TextInput
    {...props}
    addon={
      <Box
        borderInlineStart='2px solid'
        mb='neg-x8'
        pb='x8'
        borderColor='neutral-500'
        color='info'
        pis='x12'
      >
        {domain}
      </Box>
    }
  />
);

export default WorkspaceUrlInput;
