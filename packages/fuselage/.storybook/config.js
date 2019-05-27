import { addDecorator, addParameters, configure, load } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withTests } from '@storybook/addon-jest';
import { create } from '@storybook/theming';
import manifest from '../package.json';
import results from './jest-results.json';


addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: manifest.name,
      brandImage: 'https://rocket.chat/images/default/logo--dark.svg',
      brandUrl: manifest.homepage,
      gridCellSize: 8,
    }),
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /\|/,
  },
  backgrounds: [
    {
      name: 'black',
      value: 'black',
    },
  ],
});

addDecorator(withA11y);

addDecorator(withTests({
  results,
}));

configure(() => {
  const jsStories = require.context('../src', true, /stories(\/index)?\.js$/);
  jsStories.keys().forEach((filename) => jsStories(filename));
}, module);
