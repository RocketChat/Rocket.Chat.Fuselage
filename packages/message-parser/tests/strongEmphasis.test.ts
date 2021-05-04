import { parser } from '../src';
import { bold, paragraph, plain, italic, strike } from '../src/utils';

test.each([
  ['**bold**', [paragraph([bold([plain('bold')])])]],
  ['** bold**', [paragraph([bold([plain(' bold')])])]],
  ['** bold **', [paragraph([bold([plain(' bold ')])])]],
  ['** bo ld **', [paragraph([bold([plain(' bo ld ')])])]],
  ['pre**bold**', [paragraph([plain('pre'), bold([plain('bold')])])]],
  ['**bold**pos', [paragraph([bold([plain('bold')]), plain('pos')])]],
  [
    '**bold****bold**',
    [paragraph([bold([plain('bold')]), bold([plain('bold')])])],
  ],
  [
    '**bold** **bold**',
    [paragraph([bold([plain('bold')]), plain(' '), bold([plain('bold')])])],
  ],
  [
    '**bold** __italic__',
    [paragraph([bold([plain('bold')]), plain(' '), italic([plain('italic')])])],
  ],
  ['**__italicbold__**', [paragraph([bold([italic([plain('italicbold')])])])]],
  [
    'plain **__italicbold__**',
    [paragraph([plain('plain '), bold([italic([plain('italicbold')])])])],
  ],
  [
    'plain **__~~strikeitalicbold~~__**',
    [
      paragraph([
        plain('plain '),
        bold([italic([strike([plain('strikeitalicbold')])])]),
      ]),
    ],
  ],
  ['**', [paragraph([plain('**')])]],
  ['* *', [paragraph([bold([plain(' ')])])]],
  ['** *', [paragraph([plain('** *')])]],
  ['** **', [paragraph([bold([plain(' ')])])]],
  ['* Hello*', [paragraph([bold([plain(' Hello')])])]],
  ['*Hello *', [paragraph([bold([plain('Hello ')])])]],
  [
    ':custom*emoji*case:',
    [paragraph([plain(':custom'), bold([plain('emoji')]), plain('case:')])],
  ],
  [
    'text*hello*text',
    [paragraph([plain('text'), bold([plain('hello')]), plain('text')])],
  ],
  ['*hello*text', [paragraph([bold([plain('hello')]), plain('text')])]],
  ['text*hello*', [paragraph([plain('text'), bold([plain('hello')])])]],
  ['*Hel lo*', [paragraph([bold([plain('Hel lo')])])]],
  ['*Hello*', [paragraph([bold([plain('Hello')])])]],
  ['**Hello*', [paragraph([plain('*'), bold([plain('Hello')])])]],
  ['*Hello**', [paragraph([bold([plain('Hello')]), plain('*')])]],
  ['*Hello', [paragraph([plain('*Hello')])]],
  ['Hello*', [paragraph([plain('Hello*')])]],
  ['He*llo', [paragraph([plain('He*llo')])]],
  [
    '***Hello***',
    [paragraph([plain('*'), bold([plain('Hello')]), plain('*')])],
  ],
  ['***Hello**', [paragraph([plain('*'), bold([plain('Hello')])])]],
  [
    '*Hello* this is dog',
    [paragraph([bold([plain('Hello')]), plain(' this is dog')])],
  ],
  [
    'Rocket cat says *Hello*',
    [paragraph([plain('Rocket cat says '), bold([plain('Hello')])])],
  ],
  [
    'He said *Hello* to her',
    [paragraph([plain('He said '), bold([plain('Hello')]), plain(' to her')])],
  ],
  [
    '**Hello** this is dog',
    [paragraph([bold([plain('Hello')]), plain(' this is dog')])],
  ],
  [
    'Rocket cat says **Hello**',
    [paragraph([plain('Rocket cat says '), bold([plain('Hello')])])],
  ],
  [
    'He said **Hello** to her',
    [paragraph([plain('He said '), bold([plain('Hello')]), plain(' to her')])],
  ],
  [
    'He was a**nn**oyed',
    [paragraph([plain('He was a'), bold([plain('nn')]), plain('oyed')])],
  ],
  [
    'There are two o in f*oo*tball',
    [
      paragraph([
        plain('There are two o in f'),
        bold([plain('oo')]),
        plain('tball'),
      ]),
    ],
  ],
  [
    '*__~bolditalicstrike~_*',
    [
      paragraph([
        plain('*__'),
        strike([plain('bolditalicstrike')]),
        plain('_*'),
      ]),
    ],
  ],
])('parses %p', (input, output) => {
  expect(parser(input)).toMatchObject(output);
});
