import React, { FC, ReactElement } from 'react';

type MessageGenericPreviewContentProps = {
  thumb?: ReactElement;
};

export const MessageGenericPreviewContent: FC<MessageGenericPreviewContentProps> = ({
  thumb,
  ...props
}) => (
  <div className='rcx-message-generic-preview__content'>
    {thumb}
    <div className='rcx-message-generic-preview__content-wrapper' {...props} />
  </div>
);
