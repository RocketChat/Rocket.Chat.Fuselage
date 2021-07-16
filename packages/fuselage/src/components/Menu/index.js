import React, { useRef, useCallback } from 'react';

import { ActionButton, PositionAnimated, Options, useCursor } from '..';

const menuAction = ([selected], options) => {
  options[selected].action();
};

const mapOptions = (options) =>
  Object.entries(options).map(([value, { label }]) => [value, label]);

export const Menu = ({
  tiny,
  mini,
  small = tiny || mini ? null : true,
  options,
  optionWidth,
  placement = 'bottom-start',
  renderItem,
  maxHeight,
  ...props
}) => {
  const mappedOptions = mapOptions(options);
  const [cursor, handleKeyDown, handleKeyUp, reset, [visible, hide, show]] =
    useCursor(-1, mappedOptions, (args, [, hide]) => {
      menuAction(args, options);
      reset();
      hide();
    });

  const ref = useRef();
  const onClick = useCallback(() => {
    if (ref.current.classList.contains('focus-visible')) {
      ref.current.classList.remove('focus-visible');
      hide();
    } else {
      ref.current.focus() & show();
      ref.current.classList.add('focus-visible');
    }
  }, [show]);

  const handleSelection = useCallback(
    (args) => {
      menuAction(args, options);
      reset();
      hide();
    },
    [hide, reset, options]
  );

  return (
    <>
      <ActionButton
        ref={ref}
        ghost
        small={small}
        tiny={tiny}
        mini={mini}
        onClick={onClick}
        onBlur={hide}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        icon='kebab'
        {...props}
      />
      <PositionAnimated
        width='auto'
        visible={visible}
        anchor={ref}
        placement={placement}
      >
        <Options
          maxHeight={maxHeight}
          renderItem={renderItem}
          width={optionWidth}
          onSelect={handleSelection}
          options={mappedOptions}
          cursor={cursor}
        />
      </PositionAnimated>
    </>
  );
};
