import { Box, ButtonGroup, Button } from '@rocket.chat/fuselage';
import type { ReactElement } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Form from '../../common/Form';
import RegisterOptionCard from './RegisterOptionCard';
import StandaloneOptionCard from './StandaloneOptionCard';

type RegisterServerFormInputs = {
  registerType: 'registered' | 'standalone';
  agreement: boolean;
  updates: boolean;
};

type RegisterServerFormProps = {
  currentStep: number;
  stepCount: number;
  onSubmit: SubmitHandler<RegisterServerFormInputs>;
  onBackButtonClick: () => void;
};

const RegisterServerForm = ({
  currentStep,
  stepCount,
  onSubmit,
  onBackButtonClick,
}: RegisterServerFormProps): ReactElement => {
  const { t } = useTranslation();

  const methods = useForm<RegisterServerFormInputs>({
    defaultValues: {
      registerType: 'registered',
      agreement: false,
      updates: false,
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
