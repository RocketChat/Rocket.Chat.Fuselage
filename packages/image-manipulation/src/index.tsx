import React, { useRef, useState, ComponentProps } from 'react';
import { Box, ButtonGroup } from '@rocket.chat/fuselage';
import { Crop, Text, Doodle, Check, Cross } from './components';
import { Preview, CropRenderingLayer } from './helpers';

type ImageManipulationProps = ComponentProps<typeof Box> & {
  imgSrc: string;
};

const ImageManipulation = ({ imgSrc, ...props }: ImageManipulationProps) => {
  const parentRef = useRef<typeof Box & HTMLDivElement>(null);
  const imageRef = useRef<typeof Box & HTMLImageElement>(null);
  const [selection, setSelection] = useState<null | string>();

  return (
    <Box
      {...props}
      display='flex'
      justifyContent='space-evenly'
      alignItems='center'
      border='2px solid black'
      ref={parentRef}
    >
      <Preview
        imgSrc={imgSrc}
        ref={imageRef}
        parentRef={parentRef}
        display={
          selection === null || typeof selection === 'undefined'
            ? 'block'
            : 'none'
        }
      />
      {selection === 'crop' && (
        <CropRenderingLayer imgEle={imageRef} parentEle={parentRef} />
      )}
      {selection === null ||
        (typeof selection === 'undefined' && (
          <ButtonGroup alignSelf='flex-start' margin='5px'>
            <Crop onClick={() => setSelection('crop')} />
            <Doodle />
            <Text />
          </ButtonGroup>
        ))}

      {selection !== null && typeof selection !== 'undefined' && (
        <ButtonGroup alignSelf='flex-start' margin='5px'>
          <Check />
          <Cross />
        </ButtonGroup>
      )}
    </Box>
  );
};

export default ImageManipulation;
