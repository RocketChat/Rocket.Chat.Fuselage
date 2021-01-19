import { InputBox } from '@rocket.chat/fuselage';
import {
  BlockContext,
  uiKitModal,
  UiKitParserModal,
} from '@rocket.chat/ui-kit';
import React from 'react';

import ActionsBlock from '../blocks/ActionsBlock';
import ContextBlock from '../blocks/ContextBlock';
import DividerBlock from '../blocks/DividerBlock';
import ImageBlock from '../blocks/ImageBlock';
import InputBlock from '../blocks/InputBlock';
import SectionBlock from '../blocks/SectionBlock';
import ButtonElement from '../elements/ButtonElement';
import ImageElement from '../elements/ImageElement';
import MultiStaticSelectElement from '../elements/MultiStaticSelectElement';
import OverflowElement from '../elements/OverflowElement';
import PlainInputElement from '../elements/PlainInputElement';
import StaticSelectElement from '../elements/StaticSelectElement';
import { useBlockContext } from '../hooks';
import { mrkdwn, plainText, text } from '../text';

class ModalParser extends UiKitParserModal {
  mrkdwn(...args) {
    return mrkdwn(...args);
  }

  plainText(...args) {
    return plainText(...args);
  }

  text(...args) {
    return text(...args);
  }

  overflow(element, context) {
    return <OverflowElement context={context} {...element} parser={this} />;
  }

  button(element, context, key) {
    return (
      <ButtonElement
        element={element}
        context={context}
        key={key}
        parser={this}
      />
    );
  }

  divider(_, __, key) {
    return <DividerBlock key={key} />;
  }

  section(args, context, index) {
    return <SectionBlock key={index} {...args} parser={this} />;
  }

  actions(args, _, key) {
    return <ActionsBlock {...args} key={key} parser={this} />;
  }

  datePicker(element, context, key) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [{ loading, value, error }, action] = useBlockContext(
      element,
      context
    );
    const { actionId, placeholder } = element;
    return (
      <InputBox
        key={key}
        error={error}
        value={value}
        disabled={loading}
        id={actionId}
        name={actionId}
        rows={6}
        onInput={action}
        placeholder={this.plainText(placeholder)}
        type='date'
      />
    );
  }

  context({ elements }, context, key) {
    return <ContextBlock key={key} elements={elements} parser={this} />;
  }

  multiStaticSelect(element, context, key) {
    return (
      <MultiStaticSelectElement
        {...element}
        key={key}
        parser={this}
        context={context}
      />
    );
  }

  staticSelect(element, context, key) {
    return (
      <StaticSelectElement
        key={key}
        context={context}
        {...element}
        parser={this}
      />
    );
  }

  // selectInput(element, context, key) {
  //   const [{ loading, value }, action] = useBlockContext(element, context);
  //   return (
  //     <SelectInput key={key} value={value} onChange={action} mod-loading={loading} placeholder={element.type} disabled />
  //   );
  // }

  input({ element, label, blockId, appId }, context, index) {
    return (
      <InputBlock
        key={index}
        index={index}
        parser={this}
        context={context}
        element={{ ...element, appId, blockId }}
        label={this.plainText(label)}
      />
    );
  }

  image(element, context, key) {
    switch (context) {
      case BlockContext.BLOCK:
        return <ImageBlock key={key} element={element} surface='modal' />;

      case BlockContext.SECTION:
        return <ImageElement key={key} element={element} context={context} />;

      case BlockContext.CONTEXT:
        return <ImageElement key={key} element={element} context={context} />;

      default:
        return null;
    }
  }

  plainInput(element, context, index) {
    return (
      <PlainInputElement
        parser={this}
        element={element}
        context={context}
        index={index}
      />
    );
  }
}

export const modalParser = new ModalParser();
export const UiKitModal = (blocks, conditions = {}) =>
  uiKitModal(modalParser, { engine: 'rocket.chat', ...conditions })(blocks);