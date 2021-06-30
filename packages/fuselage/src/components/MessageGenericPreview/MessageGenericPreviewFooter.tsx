// import { css } from '@rocket.chat/css-in-js';
import React, { FC } from 'react';

import { Box } from '../..';
// import { ContextBlock } from '@rocket.chat/ui-kit';

type MessageGenericPreviewFooterProps = {
  // footer: ContextBlock;
  // footer: ContextBlock;
};

export const MessageGenericPreviewFooter: FC<MessageGenericPreviewFooterProps> = (
  props
) => (
  <Box
    color='neutral-700'
    fontScale='c1'
    width='full'
    withTruncatedText
    {...props}
  >
    {/* {(footer.elements as any[]).map(({ text }) => text).join(', ')} */}
  </Box>
);
