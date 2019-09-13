import styled from 'styled-components';

import { rebuildClassName } from '../../helpers';
import { normalized, withText, withSelectableText } from '../../mixins';
import theme from './theme';


export const Subtitle = styled.h2.attrs(rebuildClassName('subtitle'))`
  ${ normalized }

  margin-bottom: ${ theme.spacing };

  color: ${ theme.color };

  cursor: default;

  ${ withText(theme.textStyle) }
  ${ withSelectableText }
`;

Subtitle.displayName = 'Subtitle';
