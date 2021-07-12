import React, { RefObject, useEffect, Dispatch, SetStateAction } from 'react';
import { Box } from '@rocket.chat/fuselage';
import { Canvas, Image } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import { getDimensions } from '.';

type InitCanvasProps = {
  img: RefObject<typeof Box & HTMLImageElement>;
  setCanvas: Dispatch<SetStateAction<Canvas | null | undefined>>;
  parent: RefObject<typeof Box & HTMLDivElement>;
};

export const InitCanvas = ({ img, setCanvas, parent }: InitCanvasProps) => {
  useEffect(() => {
    console.log('Initializing Canvas');
    const { width, height } = getDimensions(
      img.current!.width,
      img.current!.height,
      {
        width: parent.current!.clientWidth * 0.9,
        height: parent.current!.clientHeight * 0.9,
      }
    );

    const canvas = new fabric.Canvas('canvas', {
      height,
      width,
    });
    new (fabric.Image as any).fromURL(
      img.current?.currentSrc,
      (item: Image) => {
        item.scale(1);
        item.selectable = false;
        item.scaleToWidth(canvas?.width!);
        canvas?.add(item);
        canvas?.sendToBack(item);
        // canvas?.renderAll();
      }
    );
    setCanvas(canvas);
    console.log(canvas);
  }, []);

  return <Box is='canvas' id='canvas'></Box>;
};
