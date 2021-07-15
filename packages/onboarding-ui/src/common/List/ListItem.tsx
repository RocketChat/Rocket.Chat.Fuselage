import { Box, Icon } from '@rocket.chat/fuselage';
import type { ComponentProps, ReactElement, ReactNode } from 'react';

const Title = ({
  children,
  icon,
  iconColor = 'success',
}: {
  children: ReactNode;
  icon?: string;
  iconColor?: ComponentProps<typeof Icon>['color'];
}): ReactElement => (
  <Box is='li' fontScale='c1' color='inherit'>
    {icon && <Icon name={icon} color={iconColor} size='x12' mie='x4' />}
    {children}
  </Box>
);

export default Title;
