import React, { FC } from 'react';

export const MessageGenericPreviewImage: FC<{
  url: string;
  width: number;
  height: number;
}> = ({ url, width, height, ...props }) => (
  <div
    className='rcx-message-generic-preview__preview'
    style={{ backgroundImage: `url(${url})`, maxWidth: '100%' }}
    {...props}
  >
    <div style={{ paddingTop: `${(height / width) * 100}%` }} />
  </div>
);
