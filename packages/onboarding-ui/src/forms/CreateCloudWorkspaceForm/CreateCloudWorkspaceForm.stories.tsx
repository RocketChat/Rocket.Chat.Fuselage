import type { Meta, Story } from '@storybook/react';
import type { ComponentProps } from 'react';

import CreateCloudWorkspaceForm from './CreateCloudWorkspaceForm';
import WorkspaceUrlInput from './WorkspaceUrlInput';

type Args = ComponentProps<typeof CreateCloudWorkspaceForm>;

export default {
  title: 'forms/CreateCloudWorkspaceForm',
  component: CreateCloudWorkspaceForm,
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on.*' },
  },
  args: {
    onSubmit: (val) => console.log(val),
    currentStep: 1,
    stepCount: 2,
    serverRegionOptions: [
      ['us', 'US'],
      ['br', 'BR'],
    ],
    domain: 'rocket.chat',
    validateUrl: async (url) => url !== 'rocket',
    validateEmail: async (email) => email !== 'rocket',
  },
} as Meta<Args>;

export const _CreateCloudWorkspaceForm: Story<Args> = (args) => (
  <CreateCloudWorkspaceForm {...args} />
);

export const _WorkspaceUrlInput: Story<Args> = () => (
  <WorkspaceUrlInput domain='rocket.chat' />
);
_CreateCloudWorkspaceForm.storyName = 'CreateCloudWorkspaceForm';
