import type { ReactElement } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import BackgroundLayer from '../../common/BackgroundLayer';
import FormPageLayout from '../../common/FormPageLayout';
import OrganizationInfoForm from '../../forms/OrganizationInfoForm';
import type { OrganizationInfoPayload } from '../../forms/OrganizationInfoForm/OrganizationInfoForm';

type OrganizationInfoPageProps = {
  currentStep: number;
  stepCount: number;
  organizationTypeOptions: (readonly [string, string])[];
  organizationIndustryOptions: (readonly [string, string])[];
  organizationSizeOptions: (readonly [string, string])[];
  countryOptions: (readonly [string, string])[];
  initialValues?: OrganizationInfoPayload;
  onSubmit: SubmitHandler<OrganizationInfoPayload>;
  onBackButtonClick: () => void;
};

const OrganizationInfoPage = (
  props: OrganizationInfoPageProps
): ReactElement => (
  <BackgroundLayer>
    <FormPageLayout>
      <OrganizationInfoForm {...props} />
    </FormPageLayout>
  </BackgroundLayer>
);

export default OrganizationInfoPage;
