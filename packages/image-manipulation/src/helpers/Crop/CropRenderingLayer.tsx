import React, { RefObject, useState, useEffect, ComponentProps } from 'react';
import { Box } from '@rocket.chat/fuselage';
import { Canvas, Rect } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import { InitCanvas } from '../index';
import { getDimensions } from '../';

type CropRenderingLayerProps = ComponentProps<typeof Box> & {
  imgEle: RefObject<typeof Box & HTMLImageElement>;
  parentEle: RefObject<typeof Box & HTMLDivElement>;
};

export const CropRenderingLayer = ({
  imgEle,
  parentEle,
  ...props
}: CropRenderingLayerProps) => {
  const [canvas, setCanvas] = useState<null | Canvas>();
  const [userClipPath, setUserClipPath] = useState<null | Rect>();

  useEffect(() => {
    console.log('RENDERING LAYER');
    const { width, height } = getDimensions(
      imgEle.current!.width,
      imgEle.current!.height,
      {
        width: parentEle.current!.clientWidth * 0.9,
        height: parentEle.current!.clientHeight * 0.9,
      }
    );

    let layerHeight = height - height * 0.1;
    let layerWidth = width - width * 0.1;
    const layer = new fabric.Rect({
      height: layerHeight,
      width: layerWidth,
      left: (width * 0.1) / 2,
      top: (height * 0.1) / 2,
      fill: 'rgb(178, 178, 178, 0.4)',
      transparentCorners: true,
      cornerColor: 'rgb(178, 178, 178, 0.8)',
      strokeWidth: 2,
      cornerStrokeColor: '#DC143C',
      borderColor: '#fdfdfd',
      borderDashArray: [5, 5],
      cornerStyle: 'circle',
    });
    canvas?.add(layer);
    // canvas?.bringToFront(layer);
    // canvas?.renderAll();
    setUserClipPath(layer);
    console.log(userClipPath);
  }, [canvas]);

  return (
    <Box {...props}>
      <InitCanvas setCanvas={setCanvas} img={imgEle} parent={parentEle} />
    </Box>
  );
};
