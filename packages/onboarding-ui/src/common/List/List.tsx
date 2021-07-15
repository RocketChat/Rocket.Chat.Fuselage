import { Box, Margins } from '@rocket.chat/fuselage';
import colors from '@rocket.chat/fuselage-tokens/colors.json';
import type {
  ReactElement,
  ReactNode,
  ComponentProps,
  CSSProperties,
} from 'react';

import { ListComponent } from './List.styles';

const List = ({
  children,
  listStyleType,
  icon,
  spacing = 'x6',
  color = colors.n900,
}: {
  children: ReactNode;
  spacing?: ComponentProps<typeof Margins>['block'];
  listStyleType?: CSSProperties['listStyleType'];
  color?: ComponentProps<typeof Box>['color'];
  icon?: string;
}): ReactElement => (
  <ListComponent icon={icon} listStyleType={listStyleType} color={color}>
    <Margins block={spacing}>{children}</Margins>
  </ListComponent>
);

export default List;
