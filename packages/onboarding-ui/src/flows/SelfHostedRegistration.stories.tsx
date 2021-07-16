import { action } from '@storybook/addon-actions';
import type { Meta, Story } from '@storybook/react';
import { useCallback, useState } from 'react';

import type { AdminInfoPayload } from '../forms/AdminInfoForm/AdminInfoForm';
import type { CloudAccountEmailPayload } from '../forms/CloudAccountEmailForm/CloudAccountEmailForm';
import type { OrganizationInfoPayload } from '../forms/OrganizationInfoForm/OrganizationInfoForm';
import type { RegisterServerPayload } from '../forms/RegisterServerForm/RegisterServerForm';
import AdminInfoPage from '../pages/AdminInfoPage';
import AwaitingConfirmationPage from '../pages/AwaitingConfirmationPage';
import CloudAccountEmailPage from '../pages/CloudAccountEmailPage';
import OrganizationInfoPage from '../pages/OrganizationInfoPage';
import RegisterServerPage from '../pages/RegisterServerPage';

export default {
  title: 'flows/Self-Hosted Registration',
  parameters: {
    layout: 'fullscreen',
    actions: { argTypesRegex: '^on.*' },
  },
} as Meta;

export const SelfHostedRegistration: Story = () => {
  const [path, setPath] =
    useState<`/${
      | 'admin-info'
      | 'org-info'
      | 'register-server'
      | 'cloud-email'
      | 'awaiting'}`>('/admin-info');

  const [adminInfo, setAdminInfo] =
    useState<Omit<AdminInfoPayload, 'password'>>();

  const [organizationInfo, setOrganizationInfo] =
    useState<OrganizationInfoPayload>();

  const [registerServer, setRegisterServer] = useState<RegisterServerPayload>();

  const [cloudAccountEmail, setCloudAccountEmail] =
    useState<CloudAccountEmailPayload>();

  const handleAdminInfoSubmit = useCallback((data: AdminInfoPayload) => {
    action('submit')(data);
    setAdminInfo(data);
    setPath('/org-info');
  }, []);

  const handleOrganizationInfoSubmit = useCallback(
    (data: OrganizationInfoPayload) => {
      action('submit')(data);
      setOrganizationInfo(data);
      setPath('/register-server');
    },
    []
  );

  const handleRegisterServerSubmit = useCallback(
    (data: RegisterServerPayload) => {
      action('submit')(data);
      setRegisterServer(data);
      setPath('/cloud-email');
    },
    []
  );

  const handleCloudAccountEmailSubmit = useCallback(
    (data: CloudAccountEmailPayload) => {
      action('submit')(data);
      setCloudAccountEmail(data);
      setPath('/awaiting');
    },
    []
  );

  if (path === '/admin-info') {
    return (
      <AdminInfoPage
        currentStep={1}
        stepCount={4}
        passwordRulesHint=''
        validateUsername={() => true}
        validateEmail={() => true}
        validatePassword={() => true}
        initialValues={adminInfo}
        onSubmit={handleAdminInfoSubmit}
      />
    );
  }

  if (path === '/org-info') {
    return (
      <OrganizationInfoPage
        currentStep={2}
        stepCount={4}
        organizationTypeOptions={[]}
        organizationIndustryOptions={[]}
        organizationSizeOptions={[]}
        countryOptions={[]}
        initialValues={organizationInfo}
        onBackButtonClick={() => setPath('/admin-info')}
        onSubmit={handleOrganizationInfoSubmit}
      />
    );
  }

  if (path === '/register-server') {
    return (
      <RegisterServerPage
        currentStep={3}
        stepCount={4}
        initialValues={registerServer}
        onBackButtonClick={() => setPath('/org-info')}
        onSubmit={handleRegisterServerSubmit}
      />
    );
  }

  if (path === '/cloud-email') {
    return (
      <CloudAccountEmailPage
        currentStep={4}
        stepCount={4}
        initialValues={cloudAccountEmail}
        onBackButtonClick={() => setPath('/register-server')}
        onSubmit={handleCloudAccountEmailSubmit}
      />
    );
  }

  if (path === '/awaiting') {
    if (!cloudAccountEmail?.email) {
      throw new Error('missing cloud account email');
    }

    return (
      <AwaitingConfirmationPage
        emailAddress={cloudAccountEmail?.email}
        securityCode={'lero lero'}
        onChangeEmailRequest={() => undefined}
        onResendEmailRequest={() => undefined}
      />
    );
  }

  throw new Error('invalid path');
};
SelfHostedRegistration.storyName = 'Self-Hosted Registration';

// AdminInfo -> OrganizationInfo -> RegisterServer -> CloudAccountEmail -> AwaitingConfirmation -> [envio de email] -> ConfirmationProcess -> EmailConfirmed
