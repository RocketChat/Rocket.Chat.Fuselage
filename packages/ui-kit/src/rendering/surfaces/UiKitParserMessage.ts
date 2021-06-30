import { LayoutBlockType } from '../../blocks/LayoutBlockType';
import { BaseSurfaceRenderer } from '../BaseSurfaceRenderer';
import { GenericSurfaceLayout } from './GenericSurfaceLayout';

type AllowedLayoutsMessage =
  | LayoutBlockType.ACTIONS
  | LayoutBlockType.CONTEXT
  | LayoutBlockType.DIVIDER
  | LayoutBlockType.IMAGE
  | LayoutBlockType.SECTION
  | LayoutBlockType.PREVIEW;

export abstract class UiKitParserMessage<
  OutputElement
> extends BaseSurfaceRenderer<OutputElement, AllowedLayoutsMessage> {
  public constructor() {
    super([
      LayoutBlockType.ACTIONS,
      LayoutBlockType.CONTEXT,
      LayoutBlockType.DIVIDER,
      LayoutBlockType.IMAGE,
      LayoutBlockType.SECTION,
      LayoutBlockType.PREVIEW,
    ]);
  }
}

export type MessageSurfaceLayout = GenericSurfaceLayout<AllowedLayoutsMessage>;
