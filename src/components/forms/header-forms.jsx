import { useTheme } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import { RHFRadioGroup } from '../hook-form/index.js';
import Table from '@mui/material/Table';

// ----------------------------------------------------------------------
export const LINES = [
  { value: '22', label: '22' },
  { value: '23', label: '23' },
  { value: '24', label: '24' },
];

export default function HeaderForms() {
  const theme = useTheme();

  return (
    <Table sx={{ minWidth: '100%' }}>
      <TableHead>
        <TableRow sx={{ border: '1px solid gray' }}>
          <TableCell>Nombre del Producto:</TableCell>
          <TableCell
            sx={{ typography: 'subtitle2', backgroundColor: 'transparent' }}
            colSpan={6}
            align="center"
          >
            LRFXL
          </TableCell>
        </TableRow>
        <TableRow sx={{ border: '1px solid gray' }}>
          <TableCell>"PartNumber"</TableCell>
          <TableCell sx={{ typography: 'subtitle2', backgroundColor: 'transparent' }}>
            27-7104
          </TableCell>
          <TableCell>Numero de Lote</TableCell>
          <TableCell sx={{ typography: 'subtitle2', backgroundColor: 'transparent' }} colSpan={6}>
            242401590
          </TableCell>
        </TableRow>
        <TableRow sx={{ border: '1px solid gray' }}>
          <TableCell>Linea</TableCell>
          <TableCell colSpan={6} sx={{ backgroundColor: 'transparent' }}>
            <Stack spacing={1} direction="column" alignItems="center">
              <RHFRadioGroup row spacing={4} name="turno" options={LINES} />
            </Stack>
          </TableCell>
        </TableRow>
      </TableHead>
    </Table>
  );
}
