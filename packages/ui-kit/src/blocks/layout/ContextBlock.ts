import { Layout } from '../Layout';
import { LayoutBlockType } from '../LayoutBlockType';
import { TextObject } from '../TextObject';
import { ImageElement } from '../elements/ImageElement';

export type ContextBlockElements = TextObject | ImageElement;
export type ContextBlock<
  Elements extends ContextBlockElements = ContextBlockElements
> = Layout<{
  type: `${LayoutBlockType.CONTEXT}`;
  elements: Elements[];
}>;
