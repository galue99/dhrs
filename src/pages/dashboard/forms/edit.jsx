import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import {FormCreateView} from "../../../sections/forms/view";

// ----------------------------------------------------------------------

export default function FormsEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Dashboard: Forms Edit</title>
      </Helmet>

      <FormCreateView id={`${id}`} />
    </>
  );
}
