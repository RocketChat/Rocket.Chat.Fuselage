import type { ReactElement } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import BackgroundLayer from '../../common/BackgroundLayer';
import FormPageLayout from '../../common/FormPageLayout';
import OrganizationInfoForm from '../../forms/OrganizationInfoForm';

type OrganizationInfoPageProps = {
  title?: string;
  description?: string;
  currentStep: number;
  stepCount: number;
  organizationTypeOptions: (readonly [string, string])[];
  organizationIndustryOptions: (readonly [string, string])[];
  organizationSizeOptions: (readonly [string, string])[];
  countryOptions: (readonly [string, string])[];
  onSubmit: SubmitHandler<{
    organizationName: string;
    organizationType: string;
    organizationIndustry: string;
    organizationSize: string;
    country: string;
  }>;
  onBackButtonClick: () => void;
  onConfirmText?: string;
  onClickSkip?: () => void;
};

const OrganizationInfoPage = (
  props: OrganizationInfoPageProps
): ReactElement => (
  <BackgroundLayer>
    <FormPageLayout title={props.title} description={props.description}>
      <OrganizationInfoForm {...props} />
    </FormPageLayout>
  </BackgroundLayer>
);

export default OrganizationInfoPage;
