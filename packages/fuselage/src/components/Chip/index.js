import React from 'react';

import { Box } from '../Box';
import { Avatar, Icon, Flex, Margins } from '../..';

const Wrapper = Box.extend('rcx-chip__wrapper', 'div');
const Container = Box.extend('rcx-chip', 'button');

const ThumbDefault = ({ url }) => <Avatar size='x20' url={url}/>;
const RemoveDefault = () => <Icon name='cross' size='16' />;

export const Chip = ({ children, thumbUrl, Thumb = ThumbDefault, onClick, Remove = RemoveDefault, ...props }) => (
  <Flex.Container>
    <Container disabled={!onClick} onClick={onClick} {...props}>
      {Thumb && thumbUrl && <Margins all={4}>
        <Thumb url={thumbUrl}/>
      </Margins>}
      {children && <Flex.Item shrink={1}>
        <Margins all={4}>
          <Box is='span' textStyle='paragraph' textColor='default' componentClassName='rcx-chip__text'>{children}</Box>
        </Margins>
      </Flex.Item>}
      {Remove && onClick && <Margins all={4}>
        <Box>
          <Remove/>
        </Box>
      </Margins>}
    </Container>
  </Flex.Container>
);

Chip.displayName = 'Chip';

Chip.Wrapper = ({ children, width, alignItems = 'center', wrap = 'wrap', ...props }) =>
  <Flex.Container alignItems={alignItems} wrap={wrap}>
    <Wrapper {...props}>
      {children.map((children, i) =>
        <Flex.Item key={i} shrink={1}>
          <Margins all={4}>
            {children}
          </Margins>
        </Flex.Item>,
      )}
    </Wrapper>
  </Flex.Container>;