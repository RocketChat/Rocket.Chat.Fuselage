import {
  FieldGroup,
  Field,
  ButtonGroup,
  Button,
  TextInput,
  Select,
  SelectOptions,
} from '@rocket.chat/fuselage';
import type { ReactElement } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Form from '../../common/Form';

type OrganizationInfoFormInputs = {
  organizationName: string;
  organizationType: string;
  organizationIndustry: string;
  organizationSize: string;
  country: string;
};

type OrganizationInfoFormProps = {
  currentStep: number;
  stepCount: number;
  organizationTypeOptions: SelectOptions;
  organizationIndustryOptions: SelectOptions;
  organizationSizeOptions: SelectOptions;
  countryOptions: SelectOptions;
  onSubmit: SubmitHandler<OrganizationInfoFormInputs>;
  onBackButtonClick: () => void;
};

const OrganizationInfoForm = ({
  currentStep,
  stepCount,
  organizationTypeOptions,
  organizationIndustryOptions,
  organizationSizeOptions,
  countryOptions,
  onSubmit,
  onBackButtonClick,
}: OrganizationInfoFormProps): ReactElement => {
  const { t } = useTranslation();

  const {
    register,
    control,
    handleSubmit,
    formState: { isDirty, isValidating, isSubmitting, errors },
  } = useForm<OrganizationInfoFormInputs>();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Steps currentStep={currentStep} stepCount={stepCount} />
      <Form.Title>{t('form.organizationInfoForm.title')}</Form.Title>
      <Form.Subtitle>{t('form.organizationInfoForm.subtitle')}</Form.Subtitle>
      <Form.Container>
        <FieldGroup>
          <Field>
            <Field.Label>
              {t('form.organizationInfoForm.fields.organizationName.label')}
            </Field.Label>
            <Field.Row>
              <TextInput
                {...register('organizationName', { required: true })}
                placeholder={t(
                  'form.organizationInfoForm.fields.organizationName.placeholder'
                )}
              />
            </Field.Row>
            {errors.organizationName && (
              <Field.Error>{t('component.form.requiredField')}</Field.Error>
            )}
          </Field>
          <Field>
            <Field.Label>
              {t('form.organizationInfoForm.fields.organizationType.label')}
            </Field.Label>
            <Field.Row>
              <Controller
                name='organizationType'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={organizationTypeOptions}
                    placeholder={t(
                      'form.organizationInfoForm.fields.organizationType.placeholder'
                    )}
                  />
                )}
              />
            </Field.Row>
          </Field>
          <Field>
            <Field.Label>
              {t('form.organizationInfoForm.fields.organizationIndustry.label')}
            </Field.Label>
            <Field.Row>
              <Controller
                name='organizationIndustry'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={organizationIndustryOptions}
                    placeholder={t(
                      'form.organizationInfoForm.fields.organizationIndustry.placeholder'
                    )}
                  />
                )}
              />
            </Field.Row>
          </Field>
          <Field>
            <Field.Label>
              {t('form.organizationInfoForm.fields.organizationSize.label')}
            </Field.Label>
            <Field.Row>
              <Controller
                name='organizationSize'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={organizationSizeOptions}
                    placeholder={t(
                      'form.organizationInfoForm.fields.organizationSize.placeholder'
                    )}
                  />
                )}
              />
            </Field.Row>
          </Field>
          <Field>
            <Field.Label>
              {t('form.organizationInfoForm.fields.country.label')}
            </Field.Label>
            <Field.Row>
              <Controller
                name='country'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={countryOptions}
                    placeholder={t(
                      'form.organizationInfoForm.fields.country.placeholder'
                    )}
                  />
                )}
              />
            </Field.Row>
          </Field>
        </FieldGroup>
      </Form.Container>
      <Form.Footer>
        <ButtonGroup flexGrow={1}>
          <Button onClick={onBackButtonClick}>
            {t('component.form.action.back')}
          </Button>
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

export default OrganizationInfoForm;
