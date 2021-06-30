import React, {
  ComponentProps,
  FC,
  forwardRef,
  ForwardRefExoticComponent,
} from 'react';

import './Messages.styles.scss';

import { Tag } from '..';
import { prependClassName } from '../../helpers/prependClassName';
import { Box } from '../Box';
import { Divider } from './Divider';
import { Metrics } from './Metrics';
import { Toolbox } from './Toolbox';

export const MessageContainer: FC = function Container(props) {
  return (
    <div className='rcx-box rcx-box--full rcx-message-container' {...props} />
  );
};

const ContainerFixed: FC = function Container(props) {
  return (
    <div
      className='rcx-box rcx-box--full rcx-message-container rcx-message-container--fixed'
      {...props}
    />
  );
};

export const MessageLeftContainer: FC = function MessageLeftContainer(props) {
  return (
    <div
      className='rcx-box rcx-box--full rcx-message-container rcx-message-container--left'
      {...props}
    />
  );
};

export const MessageHeader: FC = function Header({ children }) {
  return (
    <div className='rcx-box rcx-box--full rcx-message-header'>
      <div className='rcx-box rcx-box--full rcx-message-header__wrapper'>
        {children}
      </div>
    </div>
  );
};

export const MessageBody: FC<{
  clamp?: 2 | 3 | 4;
  className?: string | string[];
}> = function Body({ clamp, className, ...props }) {
  return (
    <div
      className={
        prependClassName(
          className,
          [
            'rcx-message-body',
            clamp && `rcx-message-body--clamp rcx-message-body--clamp-${clamp}`,
          ]
            .filter(Boolean)
            .join(' ')
        ) as string
      }
      {...props}
    />
  );
};

export const MessageBlock: FC<{ className?: string }> = function MessageBlock({
  className,
  ...props
}) {
  return (
    <div
      className={
        prependClassName(
          className,
          'rcx-box rcx-box--full rcx-message-block'
        ) as any
      }
      {...props}
    />
  );
};

type MessageProps = ComponentProps<typeof Box> & {
  clickable?: true | false;
  sequential?: boolean;
  className?: string;
};

export const Message: ForwardRefExoticComponent<MessageProps> = forwardRef(
  function Message(
    {
      // is: Tag = 'div',
      className,
      clickable,
      sequential,
      ...props
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={prependClassName(
          className,
          [
            'rcx-message',
            (clickable || props.onClick) && 'rcx-message--clickable',
            sequential && 'rcx-message--sequential',
          ]
            .filter(Boolean)
            .join(' ')
        )}
        {...(props as any)}
      />
    );
  }
);

export const MessageTimestamp: FC<{ children: string }> = function Timestamp(
  props
) {
  return (
    <span
      className='rcx-box rcx-box--full rcx-message-header__time'
      {...props}
    />
  );
};

export const MessageName: FC<{ children: string }> = function Name(props) {
  return (
    <span
      className='rcx-box rcx-box--full rcx-message-header__name'
      {...props}
    />
  );
};
export const MessageUsername: FC<{ children: string }> = function Name(props) {
  return (
    <span
      className='rcx-box rcx-box--full rcx-message-header__username'
      {...props}
    />
  );
};

export const MessageRole: FC<{ children: string }> = function Role(props) {
  return (
    <Tag
      onClick={undefined}
      className='rcx-box rcx-box--full rcx-message-header__role'
      {...props}
      small
      disabled={undefined}
    />
  );
};

export const MessageRoles: FC = function Role(props) {
  return (
    <div
      className='rcx-box rcx-box--full rcx-message-header__roles'
      {...props}
    />
  );
};

Object.assign(Message, {
  Metrics,
  Toolbox,
  Container: MessageContainer,
  ContainerFixed,
  LeftContainer: MessageLeftContainer,
  Header: MessageHeader,
  Body: MessageBody,
  Block: MessageBlock,
  Timestamp: MessageTimestamp,
  Name: MessageName,
  Username: MessageUsername,
  Roles: MessageRoles,
  Role: MessageRole,
  Divider,
});
