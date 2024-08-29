import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Unstable_Grid2';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { _roles } from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFEditor,
  RHFCheckbox,
  RHFTextField,
} from 'src/components/hook-form';

import HeaderForms from '../../components/forms/header-forms';

export const TURNS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
];

// ----------------------------------------------------------------------

export default function FormNewEditForm2({ currentJob, setStep }) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

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
            <TableBody>
              <TableRow sx={{ border: '1px solid gray' }}>
                <TableCell width="15%" sx={{ backgroundColor: 'rgba(145, 158, 171, 0.12)' }}>
                  2. Line Clearance
                </TableCell>
                <TableCell
                  width="70%"
                  sx={{ typography: 'subtitle2', backgroundColor: 'transparent' }}
                >
                  Si está comenzando una nueva orden proceda a realizar el Line Clearance. De no
                  ser asi marque No Requerido. Para los part numbers 27-7086 y 27-7141 seleccionen
                  o requerido para la Estación de Corte. N oReq Clearance Para los part numbers
                  27-7105. 27-7086. 27-7104. 27-7124, 27-7136. 27-7115. 27-7081, 27-7129. 27-
                  7117.27-7111.27-7083.27-7110, 27-7082 y 27-7107 seleccione no requerido para la
                  Estación de Tampo.
                </TableCell>
                <TableCell width="15%" sx={{ backgroundColor: 'rgba(145, 158, 171, 0.12)' }}>
                  <RHFCheckbox name="checkbox" label="No Requerido" />
                </TableCell>
              </TableRow>
              <TableRow sx={{ border: '1px solid gray' }} colSpan={8}>
                <TableCell sx={{ backgroundColor: 'rgba(145, 158, 171, 0.12)' }} width="35%">
                  2.1. Documentar Numero de Pieza (P/N) y lote anterior
                </TableCell>
                <TableCell colSpan={6}>
                  <TableRow>
                    <TableCell>Numero de Parte:</TableCell>
                    <TableCell>
                      <TextField autoFocus margin="dense" variant="outlined" label="" />
                    </TableCell>
                    <TableCell>Numero de Lote:</TableCell>
                    <TableCell>
                      <TextField autoFocus margin="dense" variant="outlined" label="" />
                    </TableCell>
                  </TableRow>
                </TableCell>
              </TableRow>
              <TableRow sx={{ border: '1px solid gray' }}>
                <TableCell colSpan={8} sx={{ padding: '6px' }}>
                  <Grid container spacing={2} direction="row">
                    <Grid item md={7} xs={12} sx={{ backgroundColor: 'rgba(145, 158, 171, 0.12)' }}>
                      <Typography variant="h6" sx={{ textAlign: 'left' }}>
                        Tarea Operador de Estación de Corte Nota: Otro operador verificara tarea
                        realizada por sheetcutter
                      </Typography>
                      <ol>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            El árca está limpia y Organizada
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            Materiales no relacionados al nuevo lote se removieron de la línea de
                            producción
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            Documentos no relacionados al nuevo lote se removieron de la línea de
                            producción
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            {' '}
                            Ensamblajes y sub-ensamblajes norelacionadoa l nuevolote se removieron
                            de línea de producción
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            {' '}
                            Verifique que los instrumentos en la maquina estén calibrados y libre de
                            cualquier daño o cualquier componente ausente.
                          </Typography>
                        </li>
                      </ol>
                    </Grid>
                    <Grid item md={5} xs={12} display="grid" gridTemplateColumns="repeat(2, 1fr)">
                      <Typography sx={{ textAlign: 'left' }}>
                        Realizado por/Fecha:
                        <RHFCheckbox name="checkbox" label="No Requerido" />
                      </Typography>
                      <Typography sx={{ textAlign: 'left' }}>
                        Verificado por/Fecha:
                        <RHFCheckbox name="checkbox" label="No Requerido" />
                      </Typography>
                      <Box>Firma:</Box>
                      <Box>Firma:</Box>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow sx={{ border: '1px solid gray' }}>
                <TableCell colSpan={8} sx={{ padding: '6px' }}>
                  <Grid container spacing={2} direction="row">
                    <Grid item md={7} xs={12} sx={{ backgroundColor: 'rgba(145, 158, 171, 0.12)' }}>
                      <Typography variant="h6" sx={{ textAlign: 'left' }}>
                        Tarea Operador de Estación de Corte Nota: Otro operador verificara tarea
                        realizada por sheetcutter
                      </Typography>
                      <ol>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            El árca está limpia y Organizada
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            Materiales no relacionados al nuevo lote se removieron de la línea de
                            producción
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            Documentos no relacionados al nuevo lote se removieron de la línea de
                            producción
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            {' '}
                            Ensamblajes y sub-ensamblajes norelacionadoa l nuevolote se removieron
                            de línea de producción
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            {' '}
                            Verifique que los instrumentos en la maquina estén calibrados y libre de
                            cualquier daño o cualquier componente ausente.
                          </Typography>
                        </li>
                      </ol>
                    </Grid>
                    <Grid item md={5} xs={12} display="grid" gridTemplateColumns="repeat(2, 1fr)">
                      <Typography sx={{ textAlign: 'left' }}>
                        Realizado por/Fecha:
                        <RHFCheckbox name="checkbox" label="No Requerido" />
                      </Typography>
                      <Typography sx={{ textAlign: 'left' }}>
                        Verificado por/Fecha:
                        <RHFCheckbox name="checkbox" label="No Requerido" />
                      </Typography>
                      <Box>Firma:</Box>
                      <Box>Firma:</Box>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow sx={{ border: '1px solid gray' }}>
                <TableCell colSpan={8} sx={{ padding: '6px' }}>
                  <Grid container spacing={2} direction="row">
                    <Grid item md={7} xs={12} sx={{ backgroundColor: 'rgba(145, 158, 171, 0.12)' }}>
                      <Typography variant="h6" sx={{ textAlign: 'left' }}>
                        Tarea Operador de Estación de Corte Nota: Otro operador verificara tarea
                        realizada por sheetcutter
                      </Typography>
                      <ol>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            El árca está limpia y Organizada
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            Materiales no relacionados al nuevo lote se removieron de la línea de
                            producción
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            Documentos no relacionados al nuevo lote se removieron de la línea de
                            producción
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            {' '}
                            Ensamblajes y sub-ensamblajes norelacionadoa l nuevolote se removieron
                            de línea de producción
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            {' '}
                            Verifique que los instrumentos en la maquina estén calibrados y libre de
                            cualquier daño o cualquier componente ausente.
                          </Typography>
                        </li>
                      </ol>
                    </Grid>
                    <Grid item md={5} xs={12} display="grid" gridTemplateColumns="repeat(2, 1fr)">
                      <Typography sx={{ textAlign: 'left' }}>
                        Realizado por/Fecha:
                        <RHFCheckbox name="checkbox" label="No Requerido" />
                      </Typography>
                      <Typography sx={{ textAlign: 'left' }}>
                        Verificado por/Fecha:
                        <RHFCheckbox name="checkbox" label="No Requerido" />
                      </Typography>
                      <Box>Firma:</Box>
                      <Box>Firma:</Box>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow sx={{ border: '1px solid gray' }}>
                <TableCell colSpan={8} sx={{ padding: '6px' }}>
                  <Grid container spacing={2} direction="row">
                    <Grid item md={7} xs={12} sx={{ backgroundColor: 'rgba(145, 158, 171, 0.12)' }}>
                      <Typography variant="h6" sx={{ textAlign: 'left' }}>
                        Tarea Operador de Estación de Corte Nota: Otro operador verificara tarea
                        realizada por sheetcutter
                      </Typography>
                      <ol>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            El árca está limpia y Organizada
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            Materiales no relacionados al nuevo lote se removieron de la línea de
                            producción
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            Documentos no relacionados al nuevo lote se removieron de la línea de
                            producción
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            {' '}
                            Ensamblajes y sub-ensamblajes norelacionadoa l nuevolote se removieron
                            de línea de producción
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            {' '}
                            Verifique que los instrumentos en la maquina estén calibrados y libre de
                            cualquier daño o cualquier componente ausente.
                          </Typography>
                        </li>
                      </ol>
                    </Grid>
                    <Grid item md={5} xs={12} display="grid" gridTemplateColumns="repeat(2, 1fr)">
                      <Typography sx={{ textAlign: 'left' }}>
                        Realizado por/Fecha:
                        <RHFCheckbox name="checkbox" label="No Requerido" />
                      </Typography>
                      <Typography sx={{ textAlign: 'left' }}>
                        Verificado por/Fecha:
                        <RHFCheckbox name="checkbox" label="No Requerido" />
                      </Typography>
                      <Box>Firma:</Box>
                      <Box>Firma:</Box>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow sx={{ border: '1px solid gray' }}>
                <TableCell colSpan={8} sx={{ padding: '6px' }}>
                  <Grid container spacing={2} direction="row">
                    <Grid item md={7} xs={12} sx={{ backgroundColor: 'rgba(145, 158, 171, 0.12)' }}>
                      <Typography variant="h6" sx={{ textAlign: 'left' }}>
                        Tarea Operador de Estación de Corte Nota: Otro operador verificara tarea
                        realizada por sheetcutter
                      </Typography>
                      <ol>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            El árca está limpia y Organizada
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            Materiales no relacionados al nuevo lote se removieron de la línea de
                            producción
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            Documentos no relacionados al nuevo lote se removieron de la línea de
                            producción
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            {' '}
                            Ensamblajes y sub-ensamblajes norelacionadoa l nuevolote se removieron
                            de línea de producción
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                            {' '}
                            Verifique que los instrumentos en la maquina estén calibrados y libre de
                            cualquier daño o cualquier componente ausente.
                          </Typography>
                        </li>
                      </ol>
                    </Grid>
                    <Grid item md={5} xs={12} display="grid" gridTemplateColumns="repeat(2, 1fr)">
                      <Typography sx={{ textAlign: 'left' }}>
                        Realizado por/Fecha:
                        <RHFCheckbox name="checkbox" label="No Requerido" />
                      </Typography>
                      <Typography sx={{ textAlign: 'left' }}>
                        Verificado por/Fecha:
                        <RHFCheckbox name="checkbox" label="No Requerido" />
                      </Typography>
                      <Box>Firma:</Box>
                      <Box>Firma:</Box>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Box sx={{ height: '10px', position: 'relative' }} />
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
          onClick={() => setStep(1)}
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

FormNewEditForm2.propTypes = {
  currentJob: PropTypes.object,
  setStep: PropTypes.func,
};
