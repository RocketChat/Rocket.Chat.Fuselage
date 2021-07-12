import React, { forwardRef, ComponentProps, RefObject, useState } from 'react';
import { Box } from '@rocket.chat/fuselage';
import { getDimensions } from '.';

type PreviewProps = ComponentProps<typeof Box> & {
  imgSrc: string;
  parentRef: RefObject<typeof Box & HTMLDivElement>;
};

export const Preview = forwardRef<typeof Box, PreviewProps>(
  ({ imgSrc, parentRef, ...props }, ref) => {
    const [size, setSize] = useState({});
    const [dims, setDims] = useState({ width: 10, height: 10 });

    React.useEffect(() => {
      var img = new Image();
      img.src = imgSrc;
      img.onload = function (e: any) {
        setDims({
          width: e.path[0].width,
          height: e.path[0].height,
        });
      };
    }, []);

    React.useEffect(() => {
      const limitWidth = parentRef.current!.clientWidth * 0.9;
      const limitHeight = parentRef.current!.clientHeight * 0.9;
      const dimensions = getDimensions(dims.width, dims.height, {
        width: limitWidth,
        height: limitHeight,
      });
      setSize(dimensions);
    }, [imgSrc, parentRef, dims]);

    return <Box is='img' src={imgSrc} ref={ref} {...size} {...props} />;
  }
);
