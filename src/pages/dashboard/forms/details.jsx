import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { JobDetailsView } from 'src/sections/job/view';

// ----------------------------------------------------------------------

export default function FormsDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Forms Details</title>
      </Helmet>

      <JobDetailsView id={`${id}`} />
    </>
  );
}
