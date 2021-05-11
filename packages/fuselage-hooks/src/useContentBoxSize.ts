import { Ref, useRef, useState } from 'react';

import { useDebouncedCallback } from './useDebouncedCallback';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export const useContentBoxSize = (
  options: {
    debounceDelay?: number;
  } = {}
): Readonly<{
  ref: Ref<HTMLElement>;
  inlineSize: number;
  blockSize: number;
}> => {
  const ref = useRef<HTMLElement>();
  const [size, setSize] = useState({
    inlineSize: 0,
    blockSize: 0,
  });

  const setSizeWithDebounce = useDebouncedCallback(
    setSize,
    options.debounceDelay
  );

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver(
      ([
        {
          contentBoxSize: [contentBoxSize],
        },
      ]) => {
        setSizeWithDebounce((prevSize) => {
          if (
            prevSize.inlineSize === contentBoxSize.inlineSize &&
            prevSize.blockSize === contentBoxSize.blockSize
          ) {
            return prevSize;
          }

          return {
            inlineSize: contentBoxSize.inlineSize,
            blockSize: contentBoxSize.blockSize,
          };
        });
      }
    );

    observer.observe(element);

    setSize({
      inlineSize: element.clientWidth,
      blockSize: element.clientHeight,
    });

    return () => {
      observer.unobserve(element);
    };
  }, [setSizeWithDebounce]);

  return {
    ref,
    ...size,
  };
};
