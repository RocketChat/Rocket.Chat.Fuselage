import { BlockContext, IElement } from '../blocks';

export type ElementRenderer<T, E extends IElement> = (
  element: E,
  context: BlockContext,
  index: number
) => T;
