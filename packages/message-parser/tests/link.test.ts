import assert from 'assert';

import { parser } from '../src';
import { link, paragraph, plain, bold, strike, italic } from '../src/utils';

describe('Link', () => {
  describe('[title](https://rocket.chat)', () => {
    it('should return the token and the inner text', () => {
      const [tokens] = parser('[title](https://rocket.chat)');
      assert.deepEqual(
        tokens,
        paragraph([link('https://rocket.chat', plain('title'))])
      );
    });
  });

  describe('[title](http://localhost)', () => {
    it('should return the token and the inner text', () => {
      const [tokens] = parser('[title](http://localhost)');
      assert.deepEqual(
        tokens,
        paragraph([link('http://localhost', plain('title'))])
      );
    });
  });

  describe('[title](http://localhost?testing=true)', () => {
    it('should return the token and the inner text', () => {
      const [tokens] = parser('[title](http://localhost?testing=true)');
      assert.deepEqual(
        tokens,
        paragraph([link('http://localhost?testing=true', plain('title'))])
      );
    });
  });

  describe('Links should accept bold inside', () => {
    it('should return the token and the inner text', () => {
      const [tokens] = parser('[**title**](https://rocket.chat)');
      assert.deepEqual(
        tokens,
        paragraph([link('https://rocket.chat', bold([plain('title')]))])
      );
    });
  });

  describe('Links should accept strike inside', () => {
    it('should return the token and the inner text', () => {
      const [tokens] = parser('[~~title~~](https://rocket.chat)');
      assert.deepEqual(
        tokens,
        paragraph([link('https://rocket.chat', strike([plain('title')]))])
      );
    });
  });
  describe('Links should accept italic inside', () => {
    it('should return the token and the inner text', () => {
      const [tokens] = parser('[__title__](https://rocket.chat)');
      assert.deepEqual(
        tokens,
        paragraph([link('https://rocket.chat', italic([plain('title')]))])
      );
    });
  });

  describe('Links should accept italic + strike + bold inside', () => {
    it('should return the token and the inner text', () => {
      const [tokens] = parser('[__**~~title~~**__](https://rocket.chat)');
      assert.deepEqual(
        tokens,
        paragraph([
          link(
            'https://rocket.chat',
            italic([bold([strike([plain('title')])])])
          ),
        ])
      );
    });
  });
});
