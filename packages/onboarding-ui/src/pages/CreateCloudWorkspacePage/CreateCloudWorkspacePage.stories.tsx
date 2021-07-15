import type { Story, Meta } from '@storybook/react';
import type { ComponentProps } from 'react';

import CreateCloudWorkspacePage from './CreateCloudWorkspacePage';

type Args = ComponentProps<typeof CreateCloudWorkspacePage>;

export default {
  title: 'pages/CreateCloudWorkspacePage',
  component: CreateCloudWorkspacePage,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    layout: 'fullscreen',
  },
  args: {
    onSubmit: (val) => console.log(val),
    currentStep: 1,
    stepCount: 2,
    serverRegionOptions: [
      ['us', 'US'],
      ['br', 'BR'],
    ],
    validateUrl: async (url) => url !== 'rocket',
    validateEmail: async (email) => email !== 'rocket',
  },
} as Meta<Args>;

export const _CreateCloudWorkspacePage: Story<Args> = (args) => (
  <CreateCloudWorkspacePage {...args} />
);
_CreateCloudWorkspacePage.storyName = 'CreateCloudWorkspacePage';
