import PropTypes from 'prop-types';
import React from 'react';

import { Icon } from '../Icon';

export function Alert({
  children,
  className = '',
  type = 'success',
  verticalPosition,
  horizontalPosition,
  size,
  ...props
}) {
  const iconName = (type === 'success' && 'check')
    || (type === 'warning' && 'clock')
    || (type === 'danger' && 'warning');

  return <div className='rcx-box rcx-box--full rcx-toast-wrapper'><div className={`rcx-toast rcx-toast--${ type } ${ verticalPosition && horizontalPosition ? `rcx-toast-position--fixed rcx-toast-position--${ verticalPosition }--${ horizontalPosition }` : 'rcx-toast-position--static' } ${ size === 'large' ? 'rcx-toast--large' : '' } ${ className }` } {...props}> <Icon name={iconName} /> <div className='rcx-toast-content'>{children}</div></div></div>;
}

Alert.propTypes = {
  children: PropTypes.string,
  type: PropTypes.oneOf(['success', 'warning', 'danger']),
  verticalPosition: PropTypes.oneOf(['top', 'bottom', 'center']),
  horizontalPosition: PropTypes.oneOf(['left', 'right', 'center']),
  size: PropTypes.string,
};
