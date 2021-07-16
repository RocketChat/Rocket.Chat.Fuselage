import type { ReactElement } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import BackgroundLayer from '../../common/BackgroundLayer';
import FormPageLayout from '../../common/FormPageLayout';
import RegisterServerForm from '../../forms/RegisterServerForm';
import type { RegisterServerPayload } from '../../forms/RegisterServerForm/RegisterServerForm';

type RegisterServerPageProps = {
  currentStep: number;
  stepCount: number;
  initialValues?: RegisterServerPayload;
  onSubmit: SubmitHandler<RegisterServerPayload>;
  onBackButtonClick: () => void;
};

const RegisterServerPage = (props: RegisterServerPageProps): ReactElement => (
  <BackgroundLayer>
    <FormPageLayout>
      <RegisterServerForm {...props} />
    </FormPageLayout>
  </BackgroundLayer>
);

export default RegisterServerPage;
