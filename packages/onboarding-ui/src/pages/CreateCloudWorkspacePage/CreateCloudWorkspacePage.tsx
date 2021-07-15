import { Box, SelectOptions } from '@rocket.chat/fuselage';
import type { ReactElement } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useTranslation, Trans } from 'react-i18next';

import BackgroundLayer from '../../common/BackgroundLayer';
import FormPageLayout from '../../common/FormPageLayout';
import CreateCloudWorkspaceForm from '../../forms/CreateCloudWorkspaceForm';
import Description from './Description';

type CreateCloudWorkspacePageProps = {
  currentStep: number;
  stepCount: number;
  onSubmit: SubmitHandler<{
    organizationName: string;
    organizationEmail: string;
    workspaceName: string;
    workspaceURL: string;
    serverRegion: string;
    agreement: boolean;
    updates: boolean;
  }>;
  serverRegionOptions: SelectOptions;
  onBackButtonClick: () => void;
  validateUrl: (url: string) => Promise<boolean>;
  validateEmail: (url: string) => Promise<boolean>;
};

const CreateCloudWorkspacePage = (
  props: CreateCloudWorkspacePageProps
): ReactElement => {
  const { t } = useTranslation();
  return (
    <BackgroundLayer>
      <FormPageLayout
        description={<Description />}
        subtitle={t('page.cloudDescription.tryGold')}
      >
        <CreateCloudWorkspaceForm {...props} />
        <Box mbs='x28' color='alternative'>
          <Trans i18nKey='page.alreadyHaveAccount'>
            Already have an account?
            <Box
              is='a'
              color='primary-400'
              textDecorationLine='none'
              href='https://https://cloud.rocket.chat/login'
              target='_blank'
              rel='noopener noreferrer'
            >
              Manage your workspaces.
            </Box>
          </Trans>
        </Box>
      </FormPageLayout>
    </BackgroundLayer>
  );
};

export default CreateCloudWorkspacePage;
