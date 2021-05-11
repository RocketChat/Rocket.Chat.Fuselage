import { useBorderBoxSize } from '@rocket.chat/fuselage-hooks';
import React, { useCallback, useMemo } from 'react';

import { composeClassNames as cx } from '../../helpers/composeClassNames';
import { useStyleSheet } from '../../hooks/useStyleSheet';
import Button from '../Button';
import { Icon } from '../Icon';
import styleSheet from './Banner.styles.scss';

const variants = ['neutral', 'info', 'success', 'warning', 'danger'];

const Banner = ({
  inline = false,
  children,
  className,
  actionable,
  closeable,
  icon,
  title,
  variant = 'neutral',
  onAction,
  onClose,
  ...props
}) => {
  useStyleSheet();
  useStyleSheet(styleSheet);

  const { ref, inlineSize } = useBorderBoxSize({
    debounceDelay: 70,
  });

  const isIconVisible = useMemo(() => inlineSize > 375, [inlineSize]);

  variant = variants.includes(variant) ? variant : variants[0];

  const closeButtonProps = useMemo(
    () => (variant !== variants[0] ? { [variant]: true } : {}),
    [variant]
  );

  const handleBannerClick = useCallback(() => {
    if (onAction) {
      onAction();
    }
  }, [onAction]);

  const handleCloseButtonClick = useCallback(
    (event) => {
      event.stopPropagation();

      if (onClose) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <section
      className={cx('rcx-banner')(
        { [variant]: true, inline, actionable },
        className
      )}
      ref={ref}
      role='banner'
      onClick={handleBannerClick}
      {...props}
    >
      {icon && isIconVisible && (
        <div className={cx('rcx-banner__icon')({ inline })}>{icon}</div>
      )}
      <div className={cx('rcx-banner__content')({ inline })}>
        {title && (
          <h6 className={cx('rcx-banner__title')({ inline })}>{title}</h6>
        )}
        {children}
      </div>
      {closeable && (
        <div className={cx('rcx-banner__close-button')({ inline })}>
          <Button
            ghostish
            square
            small
            {...closeButtonProps}
            onClick={handleCloseButtonClick}
          >
            <Icon name='cross' size={24} />
          </Button>
        </div>
      )}
    </section>
  );
};

export default Banner;
