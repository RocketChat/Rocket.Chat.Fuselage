import {
  EmailInput,
  FieldGroup,
  Field,
  ButtonGroup,
  Button,
  PasswordInput,
  TextInput,
} from '@rocket.chat/fuselage';
import type { ReactElement } from 'react';
import { useForm, SubmitHandler, Validate } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Form from '../../common/Form';

export type AdminInfoPayload = {
  fullname: string;
  username: string;
  companyEmail: string;
  password: string;
};

type AdminInfoFormProps = {
  currentStep: number;
  stepCount: number;
  passwordRulesHint: string;
  initialValues?: Omit<AdminInfoPayload, 'password'>;
  validateUsername: Validate<string>;
  validateEmail: Validate<string>;
  validatePassword: Validate<string>;
  onSubmit: SubmitHandler<AdminInfoPayload>;
};

const AdminInfoForm = ({
  currentStep,
  stepCount,
  passwordRulesHint,
  initialValues,
  validateUsername,
  validateEmail,
  validatePassword,
  onSubmit,
}: AdminInfoFormProps): ReactElement => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { isValidating, isSubmitting, errors },
  } = useForm<AdminInfoPayload>({
    defaultValues: {
      ...initialValues,
      password: '',
    },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Steps currentStep={currentStep} stepCount={stepCount} />
      <Form.Title>{t('form.adminInfoForm.title')}</Form.Title>
      <Form.Subtitle>{t('form.adminInfoForm.subtitle')}</Form.Subtitle>
      <Form.Container>
        <FieldGroup>
          <Field>
            <Field.Label>
              {t('form.adminInfoForm.fields.fullName.placeholder')}
            </Field.Label>
            <Field.Row>
              <TextInput
                {...register('fullname', { required: true })}
                placeholder={t(
                  'form.adminInfoForm.fields.fullName.placeholder'
                )}
              />
            </Field.Row>
            {errors.fullname && (
              <Field.Error>{t('component.form.requiredField')}</Field.Error>
            )}
          </Field>
          <Field>
            <Field.Label>
              {t('form.adminInfoForm.fields.username.label')}
            </Field.Label>
            <Field.Row>
              <TextInput
                {...register('username', {
                  required: true,
                  validate: validateUsername,
                })}
                placeholder={t(
                  'form.adminInfoForm.fields.username.placeholder'
                )}
              />
            </Field.Row>
            {errors.username && (
              <Field.Error>{t('component.form.requiredField')}</Field.Error>
            )}
          </Field>
          <Field>
            <Field.Label>
              {t('form.adminInfoForm.fields.companyEmail.label')}
            </Field.Label>
            <Field.Row>
              <EmailInput
                {...register('companyEmail', {
                  required: true,
                  validate: validateEmail,
                })}
                placeholder={t(
                  'form.adminInfoForm.fields.companyEmail.placeholder'
                )}
              />
            </Field.Row>
            {errors.companyEmail && (
              <Field.Error>{t('component.form.requiredField')}</Field.Error>
            )}
          </Field>
          <Field>
            <Field.Label>
              {t('form.adminInfoForm.fields.password.label')}
            </Field.Label>
            <Field.Row>
              <PasswordInput
                {...register('password', {
                  required: true,
                  validate: validatePassword,
                })}
                placeholder={t(
                  'form.adminInfoForm.fields.password.placeholder'
                )}
              />
            </Field.Row>
            <Field.Hint>{passwordRulesHint}</Field.Hint>
            {errors.password && (
              <Field.Error>{t('component.form.requiredField')}</Field.Error>
            )}
          </Field>
        </FieldGroup>
      </Form.Container>
      <Form.Footer>
        <ButtonGroup flexGrow={1}>
          <Button type='submit' primary disabled={isValidating || isSubmitting}>
            {t('component.form.action.next')}
          </Button>
        </ButtonGroup>
      </Form.Footer>
    </Form>
  );
};

export default AdminInfoForm;
