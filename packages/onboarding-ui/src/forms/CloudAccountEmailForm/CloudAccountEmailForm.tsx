import { ButtonGroup, Button, TextInput, Field } from '@rocket.chat/fuselage';
import type { ReactElement } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Form from '../../common/Form';

export type CloudAccountEmailPayload = {
  email: string;
};

type CloudAccountEmailFormProps = {
  currentStep: number;
  stepCount: number;
  initialValues?: CloudAccountEmailPayload;
  onBackButtonClick: () => void;
  onSubmit: SubmitHandler<CloudAccountEmailPayload>;
};

const CloudAccountEmailForm = ({
  currentStep,
  stepCount,
  initialValues,
  onBackButtonClick,
  onSubmit,
}: CloudAccountEmailFormProps): ReactElement => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CloudAccountEmailPayload>({
    defaultValues: {
      email: '',
      ...initialValues,
    },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Steps currentStep={currentStep} stepCount={stepCount} />
      <Form.Title>{t('form.serverRegistrationForm.title')}</Form.Title>
      <Form.Subtitle>{t('form.accountEmailForm.description')}</Form.Subtitle>
      <Form.Container>
        <Field>
          <Field.Label htmlFor='email'>
            {t('form.accountEmailForm.inputLabel')}
          </Field.Label>
          <Field.Row>
            <TextInput
              {...register('email', { required: true })}
              placeholder={t('form.accountEmailForm.inputPlaceholder')}
            />
          </Field.Row>
          {errors.email && (
            <Field.Error>{t('component.form.requiredField')}</Field.Error>
          )}
        </Field>
      </Form.Container>
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
  );
};

export default CloudAccountEmailForm;
