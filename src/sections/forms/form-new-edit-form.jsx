import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {useMemo, useState, useEffect} from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import Checkbox from "@mui/material/Checkbox";
import Grid from '@mui/material/Unstable_Grid2';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { _roles } from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFAutocomplete
} from 'src/components/hook-form';

import {fDate} from "../../utils/format-time";
import {useAuthContext} from "../../auth/hooks";
import FancySignature from "./fancy-signature";
import HeaderForms from '../../components/forms/header-forms';

export const TURNS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
];

const OPTIONS = [
  { value: 'David Jenkins', label: 'David Jenkins' },
  { value: 'Amanda Fritz', label: 'Amanda Fritz' },
  { value: 'aff0e3be-f7f8-40e6-bf35-0b28273b0ba9', label: 'Andrew Lawson' },
  { value: 'f881298b-d9d4-48d0-a3f2-32f2c83fcdb4', label: 'Kevin Hanna' },
  { value: '9e554c62-dc20-4652-a5be-006127b9bb6a', label: 'Bryan Woods' },
  { value: '6ed91e86-fcae-4ed3-8720-091fac4fea66', label: 'Daniel Brown' },
  { value: '4f527f67-8ca5-4226-8a9c-ad1ff6776fed', label: 'Andre Roberts' },
  { value: '425e82b0-062b-4a90-ab4c-0b0e74fb6676', label: 'Tony Kaiser' },
];


// ----------------------------------------------------------------------

export default function FormNewEditForm({ currentJob, setStep, review }) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');
  const { user } = useAuthContext();

  const [signature, setSignature] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const NewJobSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    employmentTypes: Yup.array().min(1, 'Choose at least one option'),
    role: Yup.string().required('Role is required'),
    skills: Yup.array().min(1, 'Choose at least one option'),
    workingSchedule: Yup.array().min(1, 'Choose at least one option'),
    benefits: Yup.array().min(1, 'Choose at least one option'),
    locations: Yup.array().min(1, 'Choose at least one option'),
    expiredDate: Yup.mixed().nullable().required('Expired date is required'),
    salary: Yup.object().shape({
      type: Yup.string(),
      price: Yup.number().min(1, 'Price is required'),
      negotiable: Yup.boolean(),
    }),
    experience: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentJob?.title || '',
      content: currentJob?.content || '',
      employmentTypes: currentJob?.employmentTypes || [],
      experience: currentJob?.experience || '1 year exp',
      role: currentJob?.role || _roles[1],
      skills: currentJob?.skills || [],
      workingSchedule: currentJob?.workingSchedule || [],
      locations: currentJob?.locations || [],
      benefits: currentJob?.benefits || [],
      expiredDate: currentJob?.expiredDate || null,
      salary: currentJob?.salary || {
        type: 'Hourly',
        price: 0,
        negotiable: false,
      },
    }),
    [currentJob]
  );

  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentJob) {
      reset(defaultValues);
    }
  }, [currentJob, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentJob ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.job.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            FM-WI-1776-18 DHR PARA LEUKO PARA LINEAS MANUALES 22, 23 Y 24 REV 06
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            DER PARA LEUKO PARA LINEASMANUALES 22, 23 Y2 4
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Title</Typography>
              <RHFTextField name="title" placeholder="Ex: Software Engineer..." />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Content</Typography>
              <RHFEditor simple name="content" />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderProperties = (
    <Grid xs={12} md={12}>
        <Stack spacing={3} sx={{ p: 3 }}>
          <Typography variant="body2" sx={{ mb: 0.5, textAlign: 'center' }}>
            FM-WI-1776-18 DHR PARA LEUKO PARA LINEAS MANUALES 22, 23 Y 24 REV 06
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            DER PARA LEUKO PARA LINEAS MANUALES 22, 23 Y 24
          </Typography>
        </Stack>
        <div>
          <HeaderForms />
          <Box sx={{ height: '10px', position: 'relative' }} />
          <Table sx={{ minWidth: '100%' }}>
            <TableHead>
              <TableRow sx={{ border: '1px solid gray' }}>
                <TableCell colSpan={12} align="center">
                  <Typography variant="h6" sx={{ mb: 0.5, textAlign: 'center' }}>
                    Emisión del Registro de Historial del Dispositivo
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow sx={{ border: '1px solid gray' }}>
                <TableCell width="25%">Preparado Por:</TableCell>
                <TableCell
                  width="25%"
                  sx={{ typography: 'subtitle2', backgroundColor: 'transparent' }}
                >
                  <FancySignature name="David Jenkins" />
                  {/* <Block label="">
                    <RHFAutocomplete
                      name="autocomplete"
                      label="Preparado por:"
                      options={OPTIONS}
                      getOptionLabel={(option) => option.label}
                      isOptionEqualToValue={(option, value) => option.value === value.value}
                      onChange={(e) => setSignature(e.target.innerText)}
                      renderOption={(props, option) => (
                        <li {...props} key={option.value}>
                          {option.label}
                        </li>
                      )}
                    />
                  </Block> */}
                  {fDate(new Date())}</TableCell>
                <TableCell width="25%">Revisado Por:</TableCell>
                <TableCell
                  width="25%"
                  sx={{ typography: 'subtitle2', backgroundColor: 'transparent' }}
                >
                  {signature  && user.role === 'admin' &&
                    <>
                      <FancySignature name={user?.displayName}/>
                      {fDate(new Date())}
                    </>
                  }
                  </TableCell>
              </TableRow>
            </TableHead>
          </Table>

          <Box sx={{ height: '10px', position: 'relative' }} />

          <Table sx={{ minWidth: '100%' }}>
            <TableHead>
              <TableRow sx={{ border: '1px solid gray' }}>
                <TableCell colSpan={10}>
                  1. Registro de la máquina ypersonal a trabajar en la línea de Manufactura{' '}
                </TableCell>
              </TableRow>
              <TableRow sx={{ border: '1px solid gray' }}>
                <TableCell colSpan={10}>
                  1.1 Escoja el turno haciendo un circulo al que corresponda. Documente el personal
                  a trabajar en la linea de manufactura. El lider de grupo verificara el
                  adiestramiento de los empleados trabajando en las líneas de manufactura, si los
                  empleados estánadiestrados en las operaciones de las lineas. Documentara con una
                  marca de cotejo (V)enel encasillado luego firma yfecha en RealizadoPor.{' '}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Table sx={{ minWidth: '100%' }}>
            <TableHead>
              <TableRow sx={{ border: '1px solid gray' }}>
                <TableCell sx={{ border: '1px solid gray!important' }}>
                  <Stack spacing={1} direction="column" alignItems="center">
                    <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
                      Turno
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell colSpan={1} sx={{ border: '1px solid gray!important' }}>
                  <Stack spacing={1}>
                    <Typography variant="h6" sx={{ textAlign: 'center' }}>
                      Nombre Personal de Manufactura
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell colSpan={1} sx={{ border: '1px solid gray!important' }}>
                  <Stack spacing={1} sx={{ height: '100%'}}>
                    <Typography variant="subtitle2" sx={{ textAlign: "center" }}>Realizado por/Fecha:</Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: 'rgba(145, 158, 171, 0.12)' }}>
              <TableRow>
                <TableCell sx={{ border: '1px solid gray!important' }} width="20%">
                  <Stack spacing={1} direction="column" alignItems="center">
                    <RHFRadioGroup row={false} spacing={4} name="turno" options={TURNS} />
                  </Stack>
                </TableCell>
                <TableCell colSpan={1} sx={{ border: '1px solid gray!important' }} width="50%">
                  <Grid container spacing={2}>
                    <Grid item md={4} xs={12}>
                      <Block label="">
                        <RHFAutocomplete
                          name="autocomplete"
                          label="Autocomplete"
                          options={OPTIONS}
                          getOptionLabel={(option) => option.label}
                          isOptionEqualToValue={(option, value) => option.value === value.value}
                          renderOption={(props, option) => (
                            <li {...props} key={option.value}>
                              {option.label}
                            </li>
                          )}
                        />
                      </Block>
                      <Block label="">
                        <RHFAutocomplete
                          name="autocomplete"
                          label="Autocomplete"
                          options={OPTIONS}
                          getOptionLabel={(option) => option.label}
                          isOptionEqualToValue={(option, value) => option.value === value.value}
                          renderOption={(props, option) => (
                            <li {...props} key={option.value}>
                              {option.label}
                            </li>
                          )}
                        />
                      </Block>
                      <Block label="">
                        <RHFAutocomplete
                          name="autocomplete"
                          label="Autocomplete"
                          options={OPTIONS}
                          getOptionLabel={(option) => option.label}
                          isOptionEqualToValue={(option, value) => option.value === value.value}
                          renderOption={(props, option) => (
                            <li {...props} key={option.value}>
                              {option.label}
                            </li>
                          )}
                        />
                      </Block>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <Block label="">
                        <RHFAutocomplete
                          name="autocomplete"
                          label="Autocomplete"
                          options={OPTIONS}
                          getOptionLabel={(option) => option.label}
                          isOptionEqualToValue={(option, value) => option.value === value.value}
                          renderOption={(props, option) => (
                            <li {...props} key={option.value}>
                              {option.label}
                            </li>
                          )}
                        />
                      </Block>
                      <Block label="">
                        <RHFAutocomplete
                          name="autocomplete"
                          label="Autocomplete"
                          options={OPTIONS}
                          getOptionLabel={(option) => option.label}
                          isOptionEqualToValue={(option, value) => option.value === value.value}
                          renderOption={(props, option) => (
                            <li {...props} key={option.value}>
                              {option.label}
                            </li>
                          )}
                        />
                      </Block>
                      <Block label="">
                        <RHFAutocomplete
                          name="autocomplete"
                          label="Autocomplete"
                          options={OPTIONS}
                          getOptionLabel={(option) => option.label}
                          isOptionEqualToValue={(option, value) => option.value === value.value}
                          renderOption={(props, option) => (
                            <li {...props} key={option.value}>
                              {option.label}
                            </li>
                          )}
                        />
                      </Block>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <Block label="">
                        <RHFAutocomplete
                          name="autocomplete"
                          label="Autocomplete"
                          options={OPTIONS}
                          getOptionLabel={(option) => option.label}
                          isOptionEqualToValue={(option, value) => option.value === value.value}
                          renderOption={(props, option) => (
                            <li {...props} key={option.value}>
                              {option.label}
                            </li>
                          )}
                        />
                      </Block>
                      <Block label="">
                        <RHFAutocomplete
                          name="autocomplete"
                          label="Autocomplete"
                          options={OPTIONS}
                          getOptionLabel={(option) => option.label}
                          isOptionEqualToValue={(option, value) => option.value === value.value}
                          renderOption={(props, option) => (
                            <li {...props} key={option.value}>
                              {option.label}
                            </li>
                          )}
                        />
                      </Block>
                      <Block label="">
                        <RHFAutocomplete
                          name="autocomplete"
                          label="Autocomplete"
                          options={OPTIONS}
                          getOptionLabel={(option) => option.label}
                          isOptionEqualToValue={(option, value) => option.value === value.value}
                          renderOption={(props, option) => (
                            <li {...props} key={option.value}>
                              {option.label}
                            </li>
                          )}
                        />
                      </Block>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell sx={{ border: '1px solid gray!important' }} width="20%">
                  <Stack spacing={1} direction="column" alignItems="center">
                    {user.role === 'admin' &&
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="checkbox2"
                            onChange={(el) => setSignature(el.target.checked)}
                          />
                        }
                        label="Firmar"
                      />
                    }
                  </Stack>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Grid>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'right' }}>
        <Box sx={{ flexGrow: 1, pl: 3 }} />

        <LoadingButton
          type="button"
          variant="danger"
          size="large"
          loading={isSubmitting}
          onClick={() => setStep(0)}
          sx={{ ml: 2 }}
        >
          Cancelar
        </LoadingButton>
        <LoadingButton
          type="button"
          variant="contained"
          size="large"
          loading={isSubmitting}
          onClick={() => setStep(2)}
          sx={{ ml: 2 }}
        >
          {!currentJob ? 'Revisado' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderProperties}
        {renderActions}
      </Grid>
    </FormProvider>
  );
}

FormNewEditForm.propTypes = {
  currentJob: PropTypes.object,
  setStep: PropTypes.func,
  review: PropTypes.bool,
};

function Block({ label = 'RHFTextField', sx, children }) {
  return (
    <Stack spacing={1} sx={{ width: 1, ...sx }}>
      <Typography
        variant="caption"
        sx={{
          textAlign: 'right',
          fontStyle: 'italic',
          color: 'text.disabled',
        }}
      >
        {label}
      </Typography>
      {children}
    </Stack>
  );
}

Block.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  sx: PropTypes.object,
};
