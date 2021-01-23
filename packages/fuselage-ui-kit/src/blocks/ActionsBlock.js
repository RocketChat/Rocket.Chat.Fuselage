import { Box, Button } from '@rocket.chat/fuselage';
import { BlockContext, ElementType } from '@rocket.chat/ui-kit';
import React, { memo, useCallback, useMemo, useState } from 'react';

import { useSurfaceType } from '../surfaces/SurfaceContext';

const Action = ({ element, parser }) => {
  const renderedElement = parser.renderActions(
    element,
    BlockContext.ACTION,
    parser
  );

  if (!renderedElement) {
    return null;
  }

  return (
    <Box
      display='flex'
      margin={4}
      flexGrow={element.type !== ElementType.BUTTON ? 1 : undefined}
      flexBasis={element.type !== ElementType.BUTTON ? '45%' : undefined}
    >
      {renderedElement}
    </Box>
  );
};

const ActionsBlock = ({ className, blockElement, parser }) => {
  const surfaceType = useSurfaceType();

  const { appId, blockId, elements } = blockElement;

  const [showMoreVisible, setShowMoreVisible] = useState(
    () => elements.length > 5 && surfaceType !== 'banner'
  );

  const handleShowMoreClick = useCallback(() => {
    setShowMoreVisible(false);
  }, []);

  const actionElements = useMemo(
    () =>
      (showMoreVisible ? elements.slice(0, 5) : elements).map((element) => ({
        appId,
        blockId,
        ...element,
      })),
    [appId, blockId, elements, showMoreVisible]
  );

  return (
    <Box className={className} display='flex' flexWrap='wrap' margin={-4}>
      {actionElements.map((element, i) => (
        <Action key={i} element={element} parser={parser} />
      ))}
      {showMoreVisible && (
        <Box display='flex' margin={4}>
          <Button small onClick={handleShowMoreClick}>
            {parser.plainText(
              { type: 'text', text: 'Show more...' },
              BlockContext.ACTION,
              0
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default memo(ActionsBlock);
