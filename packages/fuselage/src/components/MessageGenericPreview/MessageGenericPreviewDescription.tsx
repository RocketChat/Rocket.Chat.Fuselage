import React, { FC } from 'react';

// const clamp = css`
// 	display: -webkit-box;
// 	-webkit-line-clamp: 1;
// 	-webkit-box-orient: vertical;
// 	overflow: hidden;
// `;

export const MessageGenericPreviewDescription: FC<{ clamp?: boolean }> = ({
  children,
  clamp = false,
}) => (
  <div
    className={[
      'rcx-message-generic-preview__description',
      clamp && 'rcx-message-generic-preview__description--clamp',
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {children}
  </div>
);
