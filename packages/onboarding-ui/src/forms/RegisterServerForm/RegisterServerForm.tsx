import { Box, ButtonGroup, Button } from '@rocket.chat/fuselage';
import type { ReactElement } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Form from '../../common/Form';
import RegisterOptionCard from './RegisterOptionCard';
import StandaloneOptionCard from './StandaloneOptionCard';

export type RegisterServerPayload = {
  registerType: 'registered' | 'standalone';
  agreement: boolean;
  updates: boolean;
};

type RegisterServerFormProps = {
  currentStep: number;
  stepCount: number;
  initialValues?: RegisterServerPayload;
  onSubmit: SubmitHandler<RegisterServerPayload>;
  onBackButtonClick: () => void;
};

const RegisterServerForm = ({
  currentStep,
  stepCount,
  initialValues,
  onSubmit,
  onBackButtonClick,
}: RegisterServerFormProps): ReactElement => {
  const { t } = useTranslation();

  const methods = useForm<RegisterServerPayload>({
    defaultValues: {
      registerType: 'registered',
      agreement: false,
      updates: false,
      ...initialValues,
    },
  });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Steps currentStep={currentStep} stepCount={stepCount} />
        <Form.Title>{t('form.serverRegistrationForm.title')}</Form.Title>
        <Box mbe='x24' mbs='x16'>
          <RegisterOptionCard />
        </Box>
        <StandaloneOptionCard />
        <Form.Footer>
          <ButtonGroup>
            <Button onClick={onBackButtonClick}>
              {t('component.form.action.back')}
            </Button>
            <Button type='submit' primary>
              {t('component.form.action.next')}
            </Button>
          </ButtonGroup>
        </Form.Footer>
      </Form>
    </FormProvider>
  );
};

export default RegisterServerForm;
