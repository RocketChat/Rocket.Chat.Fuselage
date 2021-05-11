/**
 * @jest-environment node
 */

import { FunctionComponent, createElement, StrictMode } from 'react';
import { renderToString } from 'react-dom/server';

import { useBorderBoxSize } from '.';

describe('useBorderBoxSize hook on server', () => {
  it('immediately returns zero sizes', () => {
    let inlineSize: unknown;
    let blockSize: unknown;
    const TestComponent: FunctionComponent = () => {
      ({ inlineSize, blockSize } = useBorderBoxSize());
      return null;
    };

    renderToString(createElement(StrictMode, {}, createElement(TestComponent)));

    expect(inlineSize).toStrictEqual(0);
    expect(blockSize).toStrictEqual(0);
  });
});
