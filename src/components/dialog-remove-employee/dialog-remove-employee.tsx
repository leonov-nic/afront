import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

import { toast } from 'react-toastify';

import { CustomButton } from '../common/button/button';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getEmployees } from "../../store/job-process/job-process";
import { deleteEmployee } from '../../store/api-action';

export interface SimpleDialogProps {
  open: boolean;
  onClose?: () => void;
}

export default function DialogRemoveEmployee(props: SimpleDialogProps): JSX.Element {
  const employees = useAppSelector(getEmployees);
  const {open, onClose} = props;
  const [employee, setEmployee] = useState<string[]>([]);
  const dispatch = useAppDispatch();


  const hundlerRemoveEmployee = () => {
    dispatch(deleteEmployee(employee[1]))
    toast.error(`Cотрудник ${employee[0]} удалён`);
    setTimeout(() => {
      hundlerCloseDialog();
    }, 300);
  }

  const hundlerCloseDialog = () => {
    onClose && onClose();
    setTimeout(() => {
      setEmployee([]);
    }, 200);
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogContent sx={{width: '450px'}}>
        <Stack>
          <IconButton aria-label="close" color="inherit" size="large" sx={{backgroundColor: 'rgba(40, 40, 40, 0.1)', width: 'fit-content', ml: 'auto'}} onClick={hundlerCloseDialog}>
            <Close/>
          </IconButton>
        </Stack>
        <DialogTitle sx={{color: 'gray', textAlign: 'center', textTransform: 'uppercase', my: 2}}>
          {employee.length > 0 ? `Do you want to delete ${employee[0]}` : 'Select Employee For Delete'}
        </DialogTitle>

        <Box sx={{ width: '100%' }}>
          <Autocomplete
            options={employees}
            getOptionLabel={(option) => option.familyName}

            disableClearable
            onChange={(_event, value) => {
              value._id && setEmployee([value.familyName, value._id])
            }}
            renderInput={(params) => (
              <TextField {...params}
                placeholder="Employee"
                fullWidth
              />
            )}
          />
          <DialogActions sx={{width: '100%', px: 0, display: 'flex'}}>
            {employee.length > 0 && <CustomButton
              disabled={!(employee.length > 0)}
              onClick={hundlerRemoveEmployee}
              sx={{minWidth: '50%', p: 2, my: 4, flexGrow: 1,
              backgroundColor: '#e44848',
              '&:hover': {backgroundColor: '#c43838'}
              }}>Yes
            </CustomButton>}
            {employee.length > 0 && <CustomButton
              onClick={hundlerCloseDialog}
              sx={{width: '50%', p: 2, my: 4,
              backgroundColor: 'gray',
              }}> No </CustomButton>}
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
