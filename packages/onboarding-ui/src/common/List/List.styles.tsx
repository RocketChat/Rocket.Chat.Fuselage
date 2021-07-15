import styled from '@rocket.chat/styled';
import type { CSSProperties } from 'react';

type ListComponentProps = {
  color: string;
  icon?: string;
  listStyleType: CSSProperties['listStyleType'];
};

export const ListComponent = styled(
  'ul',
  ({ color, icon, listStyleType, ...props }: ListComponentProps) => props
)`
  padding: 0;
  margin: 0;
  color: ${(p) => p.color};
  list-style: ${(p) =>
    p.icon
      ? `none url('data:image/svg+xml,${p.icon}') inside`
      : `${p.listStyleType || 'none'} inside`};
`;
