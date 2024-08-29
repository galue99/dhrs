import { Helmet } from 'react-helmet-async';

import FormListView from "../../../sections/forms/view/form-list-view";

// ----------------------------------------------------------------------

export default function FormsListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Forms List</title>
      </Helmet>

      <FormListView />
    </>
  );
}
