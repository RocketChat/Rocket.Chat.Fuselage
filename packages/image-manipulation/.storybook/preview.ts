import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { addParameters } from '@storybook/react';
import 'loki/configure-react';
import '@rocket.chat/icons/dist/rocketchat.css';

addParameters({
  backgrounds: {
    grid: {
      cellSize: 4,
      cellAmount: 4,
      opacity: 0.5,
    },
  },
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  options: {
    storySort: ([, a], [, b]) => a.kind.localeCompare(b.kind),
  },
});
