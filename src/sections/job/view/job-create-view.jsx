import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import JobNewEditForm from '../job-new-edit-form';

// ----------------------------------------------------------------------

export default function JobCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {/*<CustomBreadcrumbs
        heading="Create a new form"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Form',
            href: paths.dashboard.job.root,
          },
          { name: 'New form' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />*/}

      <JobNewEditForm />
    </Container>
  );
}
