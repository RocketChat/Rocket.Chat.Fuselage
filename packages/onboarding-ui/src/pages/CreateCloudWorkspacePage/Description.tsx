import { Box } from '@rocket.chat/fuselage';
import { ReactElement, useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useTranslation } from 'react-i18next';

import List from '../../common/List';
import DescriptionIcon from './DescriptionIcon';

const Description = (): ReactElement => {
  const { t } = useTranslation();

  const icon = useMemo(
    () => encodeURIComponent(renderToStaticMarkup(<DescriptionIcon />)),
    []
  );

  return (
    <div>
      <Box mbe='x40'>
        <List color='alternative' spacing='x16' icon={icon}>
          <List.Li>{t('page.cloudDescription.availability')}</List.Li>
          <List.Li>{t('page.cloudDescription.auditing')}</List.Li>
          <List.Li>{t('page.cloudDescription.integrations')}</List.Li>
          <List.Li>{t('page.cloudDescription.ldap')}</List.Li>
          <List.Li>{t('page.cloudDescription.omnichannel')}</List.Li>
          <List.Li>{t('page.cloudDescription.sla')}</List.Li>
          <List.Li>{t('page.cloudDescription.push')}</List.Li>
        </List>
      </Box>
      <Box fontScale='micro' color='info'>
        {t('page.cloudDescription.goldIncludes')}
      </Box>
    </div>
  );
};

export default Description;
