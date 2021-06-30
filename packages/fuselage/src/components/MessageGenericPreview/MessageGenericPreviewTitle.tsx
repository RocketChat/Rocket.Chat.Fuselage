import React, { FC } from 'react';

type MessageGenericPreviewTitleProps = {
  externalUrl?: string;
};

export const MessageGenericPreviewTitle: FC<MessageGenericPreviewTitleProps> = ({
  externalUrl,
  ...props
}) =>
  externalUrl ? (
    <a
      className='rcx-message-generic-preview__title'
      href={externalUrl}
      target='_blank'
      {...props}
    />
  ) : (
    <span className='rcx-message-generic-preview__title' {...props} />
  );
