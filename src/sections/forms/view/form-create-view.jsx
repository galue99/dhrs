import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';

import { useState } from 'react';

import FormNewEditForm from '../form-new-edit-form';
import FormNewEditForm2 from '../form-new-edit-form2';
import FormsView from "./form-view";

// ----------------------------------------------------------------------

export default function FormCreateView({ id }) {
  const settings = useSettingsContext();

  const [step, setStep] = useState(id !== undefined ? 1 : 0);

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

      {step === 0 && <FormsView setStep={setStep} />}
      {step === 1 && <FormNewEditForm setStep={setStep} review={id !== undefined} />}
      {step === 2 && <FormNewEditForm2 setStep={setStep} />}
    </Container>
  );
}
