import { Helmet } from 'react-helmet-async';

import { FormCreateView } from 'src/sections/forms/view';

// ----------------------------------------------------------------------

export default function FormsCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Forms</title>
      </Helmet>

      <FormCreateView />
    </>
  );
}
