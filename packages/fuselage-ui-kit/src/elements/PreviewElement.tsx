// import { TextAreaInput, TextInput } from '@rocket.chat/fuselage';
import {
  MessageGenericPreview,
  MessageGenericPreviewContent,
  MessageGenericPreviewDescription,
  MessageGenericPreviewImage,
  MessageGenericPreviewThumb,
  MessageGenericPreviewTitle,
} from '@rocket.chat/fuselage';
import { VisibilityTypesInternal } from '@rocket.chat/ui-kit/dist/esm/VisitibilityType';
import { PreviewBlock } from '@rocket.chat/ui-kit/dist/esm/blocks/layout/PreviewBlock';
import React, { FC } from 'react';

export const PreviewElement: FC<{
  element: PreviewBlock<VisibilityTypesInternal>;
}> = ({ element: { title, description, externalUrl, ...args } }) => (
  <MessageGenericPreview>
    {'preview' in args && args.preview !== undefined && (
      <MessageGenericPreviewImage
        width={args.preview.dimensions.width}
        height={args.preview.dimensions.height}
        url={args.preview.url}
      />
    )}
    <MessageGenericPreviewContent
      thumb={
        'thumb' in args && args.thumb ? (
          <MessageGenericPreviewThumb>
            <MessageGenericPreviewImage
              width={args.thumb.dimensions.width}
              height={args.thumb.dimensions.height}
              url={args.thumb.url}
            />
          </MessageGenericPreviewThumb>
        ) : undefined
      }
    >
      <MessageGenericPreviewTitle externalUrl={externalUrl}>
        {title.text}
      </MessageGenericPreviewTitle>
      <MessageGenericPreviewDescription>
        {description.text}
      </MessageGenericPreviewDescription>
    </MessageGenericPreviewContent>
  </MessageGenericPreview>
);
