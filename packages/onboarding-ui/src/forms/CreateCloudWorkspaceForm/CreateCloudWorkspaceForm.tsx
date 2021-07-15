import {
  FieldGroup,
  Field,
  ButtonGroup,
  Button,
  Box,
  TextInput,
  Select,
  SelectOptions,
  Icon,
  CheckBox,
} from '@rocket.chat/fuselage';
import type { ReactElement } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation, Trans } from 'react-i18next';

import Form from '../../common/Form';
import WorkspaceUrlInput from './WorkspaceUrlInput';

type CreateCloudWorkspaceFormPayload = {
  organizationName: string;
  organizationEmail: string;
  workspaceName: string;
  workspaceURL: string;
  serverRegion: string;
  agreement: boolean;
  updates: boolean;
};

type CreateCloudWorkspaceFormProps = {
  currentStep: number;
  stepCount: number;
  onSubmit: SubmitHandler<CreateCloudWorkspaceFormPayload>;
  serverRegionOptions: SelectOptions;
  domain: string;
  onBackButtonClick: () => void;
  validateUrl: (url: string) => Promise<boolean>;
  validateEmail: (url: string) => Promise<boolean>;
};

const CreateCloudWorkspaceForm = ({
  onSubmit,
  domain,
  currentStep,
  stepCount,
  serverRegionOptions,
  validateUrl,
  validateEmail,
}: CreateCloudWorkspaceFormProps): ReactElement => {
  const { t } = useTranslation();

  const {
    register,
    control,
    handleSubmit,
    formState: { isDirty, isValidating, isSubmitting, errors },
  } = useForm();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Steps currentStep={currentStep} stepCount={stepCount} />
      <Form.Title>{t('form.createCloudWorkspace.title')}</Form.Title>
      <FieldGroup mbs='x16'>
        <Field>
          <Field.Label>
            {t('form.createCloudWorkspace.fields.orgName')}
          </Field.Label>
          <Field.Row>
            <TextInput
              {...register('organizationName', { required: true })}
              placeholder={t('form.createCloudWorkspace.fields.orgName')}
            />
          </Field.Row>
          {errors.organizationName && (
            <Field.Error>{t('component.form.requiredField')}</Field.Error>
          )}
        </Field>
        <Field>
          <Field.Label>
            {t('form.createCloudWorkspace.fields.orgEmail.label')}
          </Field.Label>
          <Field.Row>
            <TextInput
              {...register('organizationEmail', {
                required: true,
                validate: validateEmail,
              })}
              placeholder={t(
                'form.createCloudWorkspace.fields.orgEmail.placeholder'
              )}
            />
          </Field.Row>
          {errors.organizationEmail?.type === 'required' && (
            <Field.Error>{t('component.form.requiredField')}</Field.Error>
          )}
          {errors.organizationEmail?.type === 'validate' && (
            <Field.Error>
              {t('form.createCloudWorkspace.fields.orgEmail.invalid')}
            </Field.Error>
          )}
        </Field>
        <Field>
          <Field.Label>
            {t('form.createCloudWorkspace.fields.workspaceName.label')}
            <Icon
              mis='x8'
              name='info'
              size='x16'
              title={t(
                'form.createCloudWorkspace.fields.workspaceName.tooltip'
              )}
            />
          </Field.Label>
          <Field.Row>
            <TextInput
              {...register('workspaceName', { required: true })}
              placeholder={t(
                'form.createCloudWorkspace.fields.workspaceName.label'
              )}
            />
          </Field.Row>
          {errors.workspaceName && (
            <Field.Error>{t('component.form.requiredField')}</Field.Error>
          )}
        </Field>
        <Field>
          <Field.Label>
            {t('form.createCloudWorkspace.fields.workspaceUrl.label')}
            <Icon
              mis='x8'
              name='info'
              size='x16'
              title={t('form.createCloudWorkspace.fields.workspaceUrl.tooltip')}
            />
          </Field.Label>
          <Field.Row>
            <WorkspaceUrlInput
              domain={domain}
              {...register('workspaceUrl', {
                required: true,
                validate: validateUrl,
              })}
              placeholder={t(
                'form.createCloudWorkspace.fields.workspaceUrl.placeholder'
              )}
            />
          </Field.Row>
          {errors.workspaceUrl?.type === 'required' && (
            <Field.Error>{t('component.form.requiredField')}</Field.Error>
          )}
          {errors.workspaceUrl?.type === 'validate' && (
            <Field.Error>
              {t('form.createCloudWorkspace.fields.workspaceUrl.exists')}
            </Field.Error>
          )}
        </Field>
        <Field>
          <Field.Label>
            {t('form.createCloudWorkspace.fields.serverRegion.label')}
            <Icon
              mis='x8'
              name='info'
              size='x16'
              title={t('form.createCloudWorkspace.fields.serverRegion.tooltip')}
            />
          </Field.Label>
          <Field.Row>
            <Controller
              name='serverRegion'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={serverRegionOptions}
                  placeholder={t(
                    'form.createCloudWorkspace.fields.serverRegion.label'
                  )}
                />
              )}
            />
          </Field.Row>
        </Field>
        <Field>
          <Field.Row justifyContent='flex-start'>
            <CheckBox {...register('agreement', { required: true })} mie='x8' />
            <Box is='label' htmlFor='agreement' withRichContent fontScale='c1'>
              <Trans i18nKey='component.form.termsAndConditions'>
                I agree with
                <a
                  href='https://rocket.chat/terms'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Terms and Conditions
                </a>
                and
                <a
                  href='https://rocket.chat/policy'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Privacy Policy
                </a>
              </Trans>
            </Box>
          </Field.Row>
          {errors.agreement?.type === 'required' && (
            <Field.Error>{t('component.form.requiredField')}</Field.Error>
          )}
        </Field>
        <Field>
          <Field.Row justifyContent='flex-start'>
            <CheckBox {...register('updates')} mie='x8' />
            <Box fontScale='c1'>
              {t('form.createCloudWorkspace.fields.keepMePosted')}
            </Box>
          </Field.Row>
        </Field>
      </FieldGroup>
      <Form.Footer>
        <ButtonGroup>
          <Button
            type='submit'
            primary
            disabled={!isDirty || isValidating || isSubmitting}
          >
            {t('component.form.action.next')}
          </Button>
        </ButtonGroup>
      </Form.Footer>
    </Form>
  );
};

export default CreateCloudWorkspaceForm;
