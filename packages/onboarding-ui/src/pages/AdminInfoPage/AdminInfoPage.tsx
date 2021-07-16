import type { ReactElement } from 'react';
import type { SubmitHandler, Validate } from 'react-hook-form';

import BackgroundLayer from '../../common/BackgroundLayer';
import FormPageLayout from '../../common/FormPageLayout';
import AdminInfoForm from '../../forms/AdminInfoForm';

type AdminInfoPageProps = {
  title?: string;
  description?: string;
  currentStep: number;
  stepCount: number;
  validateUsername: Validate<string>;
  validateEmail: Validate<string>;
  passwordRulesHint: string;
  keepPosted?: boolean;
  validatePassword: Validate<string>;
  onSubmit: SubmitHandler<{
    fullname: string;
    username: string;
    companyEmail: string;
    password: string;
  }>;
};

const AdminInfoPage = (props: AdminInfoPageProps): ReactElement => (
  <BackgroundLayer>
    <FormPageLayout title={props.title} description={props.description}>
      <AdminInfoForm {...props} />
    </FormPageLayout>
  </BackgroundLayer>
);

export default AdminInfoPage;
