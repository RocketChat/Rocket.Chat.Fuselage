import { BlockContext } from '@rocket.chat/ui-kit';
import React from 'react';

import ActionsBlock from './blocks/ActionsBlock';
import ContextBlock from './blocks/ContextBlock';
import DividerBlock from './blocks/DividerBlock';
import ImageBlock from './blocks/ImageBlock';
import InputBlock from './blocks/InputBlock';
import SectionBlock from './blocks/SectionBlock';
import ButtonElement from './elements/ButtonElement';
import DatePickerElement from './elements/DatePickerElement';
import ImageElement from './elements/ImageElement';
import LinearScaleElement from './elements/LinearScaleElement';
import { MultiStaticSelectElement } from './elements/MultiStaticSelectElement';
import OverflowElement from './elements/OverflowElement';
import PlainInputElement from './elements/PlainInputElement';
import { PreviewElement } from './elements/PreviewElement';
import { StaticSelectElement } from './elements/StaticSelectElement';

export function plainText(element) {
  const { text = '' /* , emoji = true */ } = element ?? {};
  return text;
}

export function mrkdwn(element = { text: '' }) {
  const { text = '' } = element ?? {};
  return text;
}

export function divider(element, context, index) {
  if (context !== BlockContext.BLOCK) {
    return null;
  }

  return <DividerBlock key={index} />;
}

export function section(element, context, index) {
  if (context !== BlockContext.BLOCK) {
    return null;
  }

  return (
    <SectionBlock
      key={index}
      blockElement={element}
      context={context}
      parser={this}
    />
  );
}

export function image(element, context, index) {
  switch (context) {
    case BlockContext.BLOCK:
      return <ImageBlock key={index} blockElement={element} parser={this} />;

    case BlockContext.SECTION:
    case BlockContext.CONTEXT:
      return <ImageElement key={index} element={element} context={context} />;

    default:
      return null;
  }
}

export function actions(element, context, index) {
  if (context !== BlockContext.BLOCK) {
    return null;
  }

  return <ActionsBlock key={index} blockElement={element} parser={this} />;
}

export function context(element, context, index) {
  if (context !== BlockContext.BLOCK) {
    return null;
  }

  return <ContextBlock key={index} blockElement={element} parser={this} />;
}

export function input(element, context, index) {
  if (context !== BlockContext.BLOCK) {
    return null;
  }

  return (
    <InputBlock
      key={index}
      blockElement={element}
      context={context}
      parser={this}
    />
  );
}

export function button(element, context, index) {
  return (
    <ButtonElement
      key={index}
      element={element}
      context={context}
      parser={this}
    />
  );
}

export function datePicker(element, context, index) {
  return (
    <DatePickerElement
      key={index}
      element={element}
      context={context}
      parser={this}
    />
  );
}

export function staticSelect(element, context, index) {
  return (
    <StaticSelectElement
      key={index}
      element={element}
      context={context}
      parser={this}
    />
  );
}

export function multiStaticSelect(element, context, index) {
  return (
    <MultiStaticSelectElement
      key={index}
      element={element}
      context={context}
      parser={this}
    />
  );
}

export function overflow(element, context, index) {
  return (
    <OverflowElement
      key={index}
      element={element}
      context={context}
      parser={this}
    />
  );
}

export function plainInput(element, context, index) {
  return (
    <PlainInputElement
      key={index}
      element={element}
      context={context}
      parser={this}
    />
  );
}

export function linearScale(element, context, index) {
  return (
    <LinearScaleElement
      key={index}
      element={element}
      context={context}
      parser={this}
    />
  );
}

export function preview(element, context, index) {
  return <PreviewElement key={index} element={element} />;
}
