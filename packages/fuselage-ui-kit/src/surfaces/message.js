import { UiKitParserMessage } from '@rocket.chat/ui-kit';
import React from 'react';

import {
  actions,
  button,
  context,
  datePicker,
  divider,
  image,
  mrkdwn,
  multiStaticSelect,
  overflow,
  plainText,
  section,
  staticSelect,
  preview,
} from '../renderers';
import MessageSurface from './MessageSurface';

class MessageParser extends UiKitParserMessage {}

MessageParser.prototype.plainText = plainText;
MessageParser.prototype.mrkdwn = mrkdwn;
MessageParser.prototype.divider = divider;
MessageParser.prototype.section = section;
MessageParser.prototype.image = image;
MessageParser.prototype.actions = actions;
MessageParser.prototype.context = context;
MessageParser.prototype.button = button;
MessageParser.prototype.datePicker = datePicker;
MessageParser.prototype.staticSelect = staticSelect;
MessageParser.prototype.multiStaticSelect = multiStaticSelect;
MessageParser.prototype.overflow = overflow;
MessageParser.prototype.preview = preview;

export const messageParser = new MessageParser();

export const UiKitMessage = (blocks, conditions = {}) => (
  <MessageSurface>
    {messageParser.render(blocks, { engine: 'rocket.chat', ...conditions })}
  </MessageSurface>
);
