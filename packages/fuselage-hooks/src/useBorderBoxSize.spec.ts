import {
  FunctionComponent,
  createElement,
  StrictMode,
  CSSProperties,
  useState,
  Ref,
} from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { useBorderBoxSize } from '.';
import ResizeObserverMock, { createBoxSizes } from './__mocks__/ResizeObserver';

describe('useBorderBoxSize hook', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    window.ResizeObserver = ResizeObserverMock;
  });

  const createRandomStyle = (): CSSProperties => ({
    boxSizing: Math.random() < 0.5 ? 'border-box' : 'content-box',
    inlineSize: Math.round(Math.random() * 1000),
    blockSize: Math.round(Math.random() * 1000),
    borderInlineStartWidth: Math.round(Math.random() * 10),
    borderInlineEndWidth: Math.round(Math.random() * 10),
    borderBlockStartWidth: Math.round(Math.random() * 10),
    borderBlockEndWidth: Math.round(Math.random() * 10),
    paddingInlineStart: Math.round(Math.random() * 50),
    paddingInlineEnd: Math.round(Math.random() * 50),
    paddingBlockStart: Math.round(Math.random() * 50),
    paddingBlockEnd: Math.round(Math.random() * 50),
  });

  it('immediately returns zero sizes', async () => {
    let inlineSize: number;
    let blockSize: number;

    const TestComponent: FunctionComponent = () => {
      let ref: Ref<HTMLElement>;
      ({ ref, inlineSize, blockSize } = useBorderBoxSize());
      return createElement('div', { ref });
    };

    await act(async () => {
      render(
        createElement(StrictMode, {}, createElement(TestComponent)),
        document.createElement('div')
      );
    });

    expect(inlineSize).toStrictEqual(0);
    expect(blockSize).toStrictEqual(0);
  });

  it('gets the observed element size', async () => {
    const initialStyle = createRandomStyle();

    let inlineSize: number;
    let blockSize: number;

    const TestComponent: FunctionComponent = () => {
      let ref: Ref<HTMLElement>;
      ({ ref, inlineSize, blockSize } = useBorderBoxSize());
      return createElement('div', { ref, style: initialStyle });
    };

    const { borderBoxSize: expectedSize } = createBoxSizes(initialStyle);

    await act(async () => {
      render(
        createElement(StrictMode, {}, createElement(TestComponent)),
        document.createElement('div')
      );
    });

    // wait the callback trigger from ResizeObserver
    await act(async () => {
      jest.advanceTimersByTime(0);
    });

    expect(inlineSize).toStrictEqual(expectedSize.inlineSize);
    expect(blockSize).toStrictEqual(expectedSize.blockSize);
  });

  it('gets the observed element size after resize', async () => {
    const initialStyle = createRandomStyle();

    const { borderBoxSize: expectedSizeA } = createBoxSizes(initialStyle);

    const newStyle = createRandomStyle();

    const { borderBoxSize: expectedSizeB } = createBoxSizes(newStyle);

    let inlineSize: number;
    let blockSize: number;
    let setStyle: (style: CSSProperties) => void;

    const TestComponent: FunctionComponent = () => {
      let ref: Ref<HTMLElement>;
      ({ ref, inlineSize, blockSize } = useBorderBoxSize());
      let style: CSSProperties;
      [style, setStyle] = useState(initialStyle);
      return createElement('div', { ref, style });
    };

    await act(async () => {
      render(
        createElement(StrictMode, {}, createElement(TestComponent)),
        document.createElement('div')
      );
    });

    // wait the callback trigger from ResizeObserver
    await act(async () => {
      jest.advanceTimersByTime(0);
    });

    const inlineSizeA = inlineSize;
    const blockSizeA = blockSize;

    await act(async () => {
      setStyle(newStyle);
    });

    // wait the callback trigger from ResizeObserver
    await act(async () => {
      jest.advanceTimersByTime(0);
    });

    const inlineSizeB = inlineSize;
    const blockSizeB = blockSize;

    expect(inlineSizeA).toStrictEqual(expectedSizeA.inlineSize);
    expect(blockSizeA).toStrictEqual(expectedSizeA.blockSize);
    expect(inlineSizeB).toStrictEqual(expectedSizeB.inlineSize);
    expect(blockSizeB).toStrictEqual(expectedSizeB.blockSize);
  });

  it('debounces the observed element size', async () => {
    const initialStyle = createRandomStyle();
    const debounceDelay = 100 + Math.round(100 * Math.random());
    const delayBeforeUpdate = Math.round(debounceDelay * 0.75);
    let inlineSize: number;
    let blockSize: number;

    const TestComponent: FunctionComponent = () => {
      let ref: Ref<HTMLElement>;
      ({ ref, inlineSize, blockSize } = useBorderBoxSize({
        debounceDelay,
      }));
      return createElement('div', { ref, style: initialStyle });
    };

    const { borderBoxSize: expectedSize } = createBoxSizes(initialStyle);

    await act(async () => {
      render(
        createElement(StrictMode, {}, createElement(TestComponent)),
        document.createElement('div')
      );
    });

    // don't wait long enough to receive a update
    await act(async () => {
      jest.advanceTimersByTime(delayBeforeUpdate);
    });

    const inlineSizeA = inlineSize;
    const blockSizeA = blockSize;

    // wait the callback trigger from ResizeObserver
    await act(async () => {
      jest.advanceTimersByTime(debounceDelay - delayBeforeUpdate);
    });

    const inlineSizeB = inlineSize;
    const blockSizeB = blockSize;

    expect(inlineSizeA).toStrictEqual(0);
    expect(blockSizeA).toStrictEqual(0);
    expect(inlineSizeB).toStrictEqual(expectedSize.inlineSize);
    expect(blockSizeB).toStrictEqual(expectedSize.blockSize);
  });
});
