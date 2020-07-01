import React, { createElement, forwardRef, memo, useContext } from 'react';
import PropTypes from 'prop-types';

import { createClassNameMapping } from '../../helpers/mergeClassNames';
import { useStyleSheet } from '../../hooks/useStyleSheet';
import { colorPropType } from '../../styles/props/colors';
import { sizePropType } from '../../styles/props/layout';
import { insetPropType } from '../../styles/props/position';
import { marginPropType, paddingPropType } from '../../styles/props/spaces';
import { fontFamilyPropType, fontScalePropType } from '../../styles/props/typography';
import { stylingPropsAliases, stylingPropsStyles } from './stylingProps';
import { ClassNamesContext } from './ClassNamesContext';
import { EventPropsContext } from './EventPropsContext';
import { StylingPropsContext } from './StylingPropsContext';

const prependClassName = (currentClassName, newClassName) =>
  (currentClassName ? `${ newClassName } ${ currentClassName }` : newClassName);

const appendClassName = (currentClassName, newClassName) =>
  (currentClassName ? `${ currentClassName } ${ newClassName }` : newClassName);

const collectBoxProps = (props, entries) => (children) => {
  let component = 'div';

  entries = entries.reduce((entries, [key, value]) => {
    if (key === 'is') {
      component = value;
      return entries;
    }

    if (key.slice(0, 4) === 'rcx-') {
      if (value) {
        const className = value === true ? key : `${ key }-${ value }`;
        props.className = prependClassName(props.className, className);
      }

      return entries;
    }

    entries.push([key, value]);

    return entries;
  }, []);

  props.className = prependClassName(props.className, 'rcx-box');

  return children(component, props, entries);
};

const collectStylingProps = (is, elementProps, entries, extraStylingProps, createClassName) => (children) => {
  const stylingProps = {};

  if (extraStylingProps) {
    Object.assign(stylingProps, extraStylingProps);
    children = ((renderElement) => (component, props, entries) => <StylingPropsContext.Provider children={renderElement(component, props, entries)} />)(children);
  }

  entries = entries.reduce((entries, [key, value]) => {
    if (key === 'htmlSize') {
      entries.push(['size', value]);
      return entries;
    }

    if (stylingPropsAliases[key]) {
      const effectiveKey = stylingPropsAliases[key];
      stylingProps[effectiveKey] = value;
      return entries;
    }

    if (stylingPropsStyles[key]) {
      stylingProps[key] = value;
      return entries;
    }

    entries.push([key, value]);

    return entries;
  }, []);

  for (const [key, value] of Object.entries(stylingProps)) {
    if (value !== false) {
      const className = createClassName(stylingPropsStyles[key](value));
      elementProps.className = appendClassName(elementProps.className, className);
    }
  }

  return children(is, elementProps, entries);
};

const collectClassNames = (is, elementProps, entries, extraClassNames, createClassName) => (children) => {
  if (extraClassNames) {
    elementProps.className = extraClassNames.reduce((className, value) => {
      if (typeof value === 'function') {
        value = createClassName(value);
      }

      if (typeof value === 'string') {
        return appendClassName(className, value);
      }

      return className;
    }, elementProps.className);

    children = ((renderElement) => (component, props, entries) => <ClassNamesContext.Provider children={renderElement(component, props, entries)} />)(children);
  }

  // class names className prop
  entries = entries.reduce((entries, [key, value]) => {
    if (key === 'className') {
      if (value) {
        elementProps.className = [].concat(value).reduce((className, value) => {
          if (typeof value === 'function') {
            value = createClassName(value);
          }

          if (typeof value === 'string') {
            return appendClassName(className, value);
          }

          return className;
        }, elementProps.className);
      }

      return entries;
    }

    entries.push([key, value]);

    return entries;
  }, []);

  return children(is, elementProps, entries);
};

const collectExtraEventProps = (is, elementProps, entries, extraEventProps) => (children) => {
  if (extraEventProps) {
    Object.assign(elementProps, extraEventProps);
    children = ((renderElement) => (component, props, entries) => <EventPropsContext.Provider children={renderElement(component, props, entries)} />)(children);
  }

  return children(is, elementProps, entries);
};

const collectRemainingProps = (props, entries) =>
  (children) =>
    children(
      entries.reduce((props, [key, value]) => {
        props[key] = value;
        return props;
      }, props),
    );

export const Box = memo(forwardRef(function Box(props, ref) {
  useStyleSheet();
  const extraEventProps = useContext(EventPropsContext);
  const extraClassNames = useContext(ClassNamesContext);
  const extraStylingProps = useContext(StylingPropsContext);
  const createClassName = createClassNameMapping(props);

  const _props = ref ? { ref } : {};
  const entries = Object.entries(props);

  return collectBoxProps(_props, entries)(
    (component, props, entries) => collectStylingProps(component, props, entries, extraStylingProps, createClassName)(
      (_, props, entries) => collectClassNames(component, props, entries, extraClassNames, createClassName)(
        (_, props, entries) => collectExtraEventProps(component, props, entries, extraEventProps)(
          (_, props, entries) => collectRemainingProps(props, entries)(
            (props) => createElement(component, props),
          ),
        ),
      ),
    ),
  );
}));

Box.propTypes = {
  is: PropTypes.elementType,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.array,
  ]),

  // Spaces
  m: PropTypes.oneOfType([marginPropType, PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([marginPropType, PropTypes.string, PropTypes.number]),
  mb: PropTypes.oneOfType([marginPropType, PropTypes.string, PropTypes.number]),
  marginBlock: PropTypes.oneOfType([marginPropType, PropTypes.string, PropTypes.number]),
  mbs: PropTypes.oneOfType([marginPropType, PropTypes.string, PropTypes.number]),
  marginBlockStart: PropTypes.oneOfType([marginPropType, PropTypes.string, PropTypes.number]),
  mbe: PropTypes.oneOfType([marginPropType, PropTypes.string, PropTypes.number]),
  marginBlockEnd: PropTypes.oneOfType([marginPropType, PropTypes.string, PropTypes.number]),
  mi: PropTypes.oneOfType([marginPropType, PropTypes.string, PropTypes.number]),
  marginInline: PropTypes.oneOfType([marginPropType, PropTypes.string, PropTypes.number]),
  mis: PropTypes.oneOfType([marginPropType, PropTypes.string, PropTypes.number]),
  marginInlineStart: PropTypes.oneOfType([marginPropType, PropTypes.string, PropTypes.number]),
  mie: PropTypes.oneOfType([marginPropType, PropTypes.string, PropTypes.number]),
  marginInlineEnd: PropTypes.oneOfType([marginPropType, PropTypes.string, PropTypes.number]),
  p: PropTypes.oneOfType([paddingPropType, PropTypes.string, PropTypes.number]),
  padding: PropTypes.oneOfType([paddingPropType, PropTypes.string, PropTypes.number]),
  pb: PropTypes.oneOfType([paddingPropType, PropTypes.string, PropTypes.number]),
  paddingBlock: PropTypes.oneOfType([paddingPropType, PropTypes.string, PropTypes.number]),
  pbs: PropTypes.oneOfType([paddingPropType, PropTypes.string, PropTypes.number]),
  paddingBlockStart: PropTypes.oneOfType([paddingPropType, PropTypes.string, PropTypes.number]),
  pbe: PropTypes.oneOfType([paddingPropType, PropTypes.string, PropTypes.number]),
  paddingBlockEnd: PropTypes.oneOfType([paddingPropType, PropTypes.string, PropTypes.number]),
  pi: PropTypes.oneOfType([paddingPropType, PropTypes.string, PropTypes.number]),
  paddingInline: PropTypes.oneOfType([paddingPropType, PropTypes.string, PropTypes.number]),
  pis: PropTypes.oneOfType([paddingPropType, PropTypes.string, PropTypes.number]),
  paddingInlineStart: PropTypes.oneOfType([paddingPropType, PropTypes.string, PropTypes.number]),
  pie: PropTypes.oneOfType([paddingPropType, PropTypes.string, PropTypes.number]),
  paddingInlineEnd: PropTypes.oneOfType([paddingPropType, PropTypes.string, PropTypes.number]),

  // Color

  color: PropTypes.oneOfType([colorPropType, PropTypes.string]),
  backgroundColor: PropTypes.oneOfType([colorPropType, PropTypes.string]),
  opacity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  // Typography
  fontFamily: PropTypes.oneOfType([fontFamilyPropType, PropTypes.string]),
  fontSize: PropTypes.oneOfType([fontScalePropType, sizePropType, PropTypes.string, PropTypes.number]),
  fontWeight: PropTypes.oneOfType([fontScalePropType, PropTypes.string]),
  lineHeight: PropTypes.oneOfType([fontScalePropType, sizePropType, PropTypes.string, PropTypes.number]),
  letterSpacing: PropTypes.oneOfType([fontScalePropType, PropTypes.string, PropTypes.number]),
  fontScale: fontScalePropType,
  fontStyle: PropTypes.string,
  textAlign: PropTypes.string,
  textTransform: PropTypes.string,
  textDecorationLine: PropTypes.string,

  // Layout
  w: PropTypes.oneOfType([sizePropType, PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([sizePropType, PropTypes.string, PropTypes.number]),
  minWidth: PropTypes.oneOfType([sizePropType, PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([sizePropType, PropTypes.string, PropTypes.number]),
  h: PropTypes.oneOfType([sizePropType, PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([sizePropType, PropTypes.string, PropTypes.number]),
  minHeight: PropTypes.oneOfType([sizePropType, PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([sizePropType, PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOfType([sizePropType, PropTypes.string, PropTypes.number]),
  minSize: PropTypes.oneOfType([sizePropType, PropTypes.string, PropTypes.number]),
  maxSize: PropTypes.oneOfType([sizePropType, PropTypes.string, PropTypes.number]),
  htmlSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  display: PropTypes.string,
  verticalAlign: PropTypes.string,
  overflow: PropTypes.string,
  overflowX: PropTypes.string,
  overflowY: PropTypes.string,

  // FlexBox
  alignItems: PropTypes.string,
  alignContent: PropTypes.string,
  justifyItems: PropTypes.string,
  justifyContent: PropTypes.string,
  flexWrap: PropTypes.string,
  flexDirection: PropTypes.string,
  flexGrow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  flexShrink: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  flexBasis: PropTypes.string,
  justifySelf: PropTypes.string,
  alignSelf: PropTypes.string,
  order: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // Borders
  border: PropTypes.string,
  borderBlock: PropTypes.string,
  borderBlockStart: PropTypes.string,
  borderBlockEnd: PropTypes.string,
  borderInline: PropTypes.string,
  borderInlineStart: PropTypes.string,
  borderInlineEnd: PropTypes.string,
  borderWidth: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'x1', 'x2', 'x4']),
    PropTypes.string,
    PropTypes.number,
  ]),
  borderBlockWidth: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'x1', 'x2', 'x4']),
    PropTypes.string,
    PropTypes.number,
  ]),
  borderBlockStartWidth: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'x1', 'x2', 'x4']),
    PropTypes.string,
    PropTypes.number,
  ]),
  borderBlockEndWidth: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'x1', 'x2', 'x4']),
    PropTypes.string,
    PropTypes.number,
  ]),
  borderInlineWidth: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'x1', 'x2', 'x4']),
    PropTypes.string,
    PropTypes.number,
  ]),
  borderInlineStartWidth: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'x1', 'x2', 'x4']),
    PropTypes.string,
    PropTypes.number,
  ]),
  borderInlineEndWidth: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'x1', 'x2', 'x4']),
    PropTypes.string,
    PropTypes.number,
  ]),
  borderStyle: PropTypes.string,
  borderBlockStyle: PropTypes.string,
  borderBlockStartStyle: PropTypes.string,
  borderBlockEndStyle: PropTypes.string,
  borderInlineStyle: PropTypes.string,
  borderInlineStartStyle: PropTypes.string,
  borderInlineEndStyle: PropTypes.string,
  borderColor: PropTypes.oneOfType([colorPropType, PropTypes.string]),
  borderBlockColor: PropTypes.oneOfType([colorPropType, PropTypes.string]),
  borderBlockStartColor: PropTypes.oneOfType([colorPropType, PropTypes.string]),
  borderBlockEndColor: PropTypes.oneOfType([colorPropType, PropTypes.string]),
  borderInlineColor: PropTypes.oneOfType([colorPropType, PropTypes.string]),
  borderInlineStartColor: PropTypes.oneOfType([colorPropType, PropTypes.string]),
  borderInlineEndColor: PropTypes.oneOfType([colorPropType, PropTypes.string]),
  borderRadius: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'x2', 'x4', 'full']),
    PropTypes.string,
    PropTypes.number,
  ]),
  borderStartStartRadius: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'x2', 'x4', 'full']),
    PropTypes.string,
    PropTypes.number,
  ]),
  borderStartEndRadius: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'x2', 'x4', 'full']),
    PropTypes.string,
    PropTypes.number,
  ]),
  borderEndStartRadius: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'x2', 'x4', 'full']),
    PropTypes.string,
    PropTypes.number,
  ]),
  borderEndEndRadius: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'x2', 'x4', 'full']),
    PropTypes.string,
    PropTypes.number,
  ]),

  // Inset
  position: PropTypes.string,
  zIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inset: PropTypes.oneOfType([insetPropType, PropTypes.string, PropTypes.number]),
  insetBlock: PropTypes.oneOfType([insetPropType, PropTypes.string, PropTypes.number]),
  insetBlockStart: PropTypes.oneOfType([insetPropType, PropTypes.string, PropTypes.number]),
  insetBlockEnd: PropTypes.oneOfType([insetPropType, PropTypes.string, PropTypes.number]),
  insetInline: PropTypes.oneOfType([insetPropType, PropTypes.string, PropTypes.number]),
  insetInlineStart: PropTypes.oneOfType([insetPropType, PropTypes.string, PropTypes.number]),
  insetInlineEnd: PropTypes.oneOfType([insetPropType, PropTypes.string, PropTypes.number]),

  // Special
  elevation: PropTypes.oneOf(['0', '1', '2']),
  invisible: PropTypes.bool,
  withRichContent: PropTypes.bool,
  withTruncatedText: PropTypes.bool,
};

export * from './ClassNamesContext';
export * from './AnimatedVisibility';
export * from './Flex';
export * from './Margins';
export * from './Position';
export * from './Scrollable';
