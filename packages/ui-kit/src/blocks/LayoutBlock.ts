import { LayoutBlockType } from './LayoutBlockType';
import { ActionsBlock } from './layout/ActionsBlock';
import { ConditionalBlock } from './layout/ConditionalBlock';
import { ContextBlock } from './layout/ContextBlock';
import { DividerBlock } from './layout/DividerBlock';
import { ImageBlock } from './layout/ImageBlock';
import { InputBlock } from './layout/InputBlock';
import { PreviewBlock } from './layout/PreviewBlock';
import { SectionBlock } from './layout/SectionBlock';

export type LayoutBlockMap = {
  [LayoutBlockType.ACTIONS]: ActionsBlock;
  [LayoutBlockType.CONDITIONAL]: ConditionalBlock;
  [LayoutBlockType.CONTEXT]: ContextBlock;
  [LayoutBlockType.DIVIDER]: DividerBlock;
  [LayoutBlockType.IMAGE]: ImageBlock;
  [LayoutBlockType.INPUT]: InputBlock;
  [LayoutBlockType.SECTION]: SectionBlock;
  [LayoutBlockType.PREVIEW]: PreviewBlock;
};

export type LayoutBlock = LayoutBlockMap[keyof LayoutBlockMap];
