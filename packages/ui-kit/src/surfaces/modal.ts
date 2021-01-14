import { ElementType, IElement, IInputBlock } from '../blocks';
import { createElementRenderer, createSurfaceRenderer } from '../functions';
import { IParserModal } from '../parsers/IParserModal';
import { ElementRenderer } from '../renderers/ElementRenderer';
import { UiKitParserMessage } from './message';

export abstract class UiKitParserModal
  extends UiKitParserMessage
  implements IParserModal<unknown> {
  input: ElementRenderer<unknown, IInputBlock>;

  plainInput: ElementRenderer<unknown, IElement>;

  renderInputs = createElementRenderer(this, [
    ElementType.STATIC_SELECT,
    ElementType.PLAIN_TEXT_INPUT,
    ElementType.MULTI_STATIC_SELECT,
    ElementType.CONVERSATION_SELECT,
    ElementType.CHANNEL_SELECT,
    ElementType.USER_SELECT,
    ElementType.USER_SELECT,
    ElementType.DATEPICKER,
  ]);
}

export const uiKitModal = createSurfaceRenderer<unknown>([
  ElementType.DIVIDER,
  ElementType.SECTION,
  ElementType.IMAGE,
  ElementType.ACTIONS,
  ElementType.CONTEXT,
  ElementType.INPUT,
]);
