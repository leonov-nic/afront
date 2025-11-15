import { useState, useEffect, useMemo } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

import { toast } from 'react-toastify';

import { CustomButton } from '../common/button/button';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getUser } from '../../store/user-process/user-process';
import { getEmployees, getIsLoading } from "../../store/job-process/job-process";
import { deleteEmployee, fetchDeletedEmployees, recoveryEmployee } from '../../store/api-action';
import { TEmployee } from '../../types';

export interface SimpleDialogProps {
  open: boolean;
  onClose?: () => void;
}

export default function DialogRemoveEmployee(props: SimpleDialogProps): JSX.Element {
  const employees = useAppSelector(getEmployees);
  const isLoading = useAppSelector(getIsLoading);
  const user = useAppSelector(getUser);
  const shouldShowCheckbox = user && user.name === "Liza S";

  const dispatch = useAppDispatch();

  const {open, onClose} = props;

  const [employee, setEmployee] = useState<TEmployee | null>(null);
  const [deletedEmployees, setDeletedEmployees] = useState<TEmployee[]>([]);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentEmployees = useMemo(() => employees, [employees]);
  const options = useMemo(() => checked ? deletedEmployees : currentEmployees, [checked, currentEmployees, deletedEmployees]);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (checked) {
        setLoading(true);
        try {
          const data = await dispatch(fetchDeletedEmployees());
          if (data.meta.requestStatus === "fulfilled") {
            setDeletedEmployees(data.payload as TEmployee[]);
          }
        } catch (error) {
          console.error("Failed to fetch deleted employees:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchEmployees();
  }, [checked, dispatch]);


  const handleCheckboxRecoveryOfEmployee = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setEmployee(null);
  };

  const handleRecoveryOfEmployee = async () => {
    if (!employee) return;
    await dispatch(recoveryEmployee(employee['_id']));
    toast.info(`Employee ${employee && employee['familyName']} restored`, {style: {background: '#138a86ff'}, });
    hundlerCloseDialog();
  }

  const hundlerRemoveEmployee = async () => {
    if (!employee) return;
    setEmployee(null); 
    await dispatch(deleteEmployee(employee['_id']));
    toast.error(`Employee ${employee && employee['familyName']} deleted`);
    hundlerCloseDialog();
  }

  const hundlerCloseDialog = () => {
    setChecked(false);
    setEmployee(null);
    onClose && onClose();
  }

  return (
    <Dialog onClose={hundlerCloseDialog} open={open}>
      <DialogContent sx={{width: '450px'}}>
        <Stack>
          <IconButton aria-label="close" color="inherit" size="large" sx={{backgroundColor: 'rgba(40, 40, 40, 0.1)', width: 'fit-content', ml: 'auto'}} onClick={hundlerCloseDialog}>
            <Close/>
          </IconButton>
        </Stack>
        <DialogTitle sx={{color: 'gray', textAlign: 'center', textTransform: 'uppercase', my: 2}}>
          {employee ? `Do you want to ${checked ? 'recovery' : 'delete'} ${employee['familyName']}` : `Select Employee For ${checked ? 'Recovery' : 'Delete'}`}
        </DialogTitle>

        <Box sx={{ width: '100%' }}>
          <Autocomplete
            options={options}
            value={employee}
            autoComplete={false}
            getOptionLabel={(option) => option.familyName}
            onChange={(_event, value: TEmployee | null) => {
              setEmployee(value);
            }}
            filterSelectedOptions
            isOptionEqualToValue={(option: TEmployee, value: TEmployee) => option._id === value._id}
            renderInput={(params) => (
              <TextField {...params}
                placeholder={checked ? "Recovery employee" : "Employee"}
                fullWidth
                disabled={loading}
              />
            )}
          />

          <DialogActions sx={{width: '100%', px: 0, display: 'flex'}}>
            {employee && 
              <CustomButton
                disabled={isLoading || loading}
                onClick={checked ? handleRecoveryOfEmployee : hundlerRemoveEmployee}
                sx={{minWidth: '50%', p: 2, my: 4, flexGrow: 1,
                backgroundColor: checked ? '#17c1bc' : '#e44848', 
                '&:hover': {backgroundColor: checked ? '#138a86ff' : '#c43838'}
                }}>{isLoading ? 'loading...' : 'Yes'}
              </CustomButton>
            }
            {employee && 
              <CustomButton
                disabled={isLoading || loading}
                onClick={hundlerCloseDialog}
                sx={{width: '50%', p: 2, my: 4,
                backgroundColor: 'gray',
                }}>{isLoading ? 'loading...' : 'No'} 
              </CustomButton>
            }
          </DialogActions>
        
          {shouldShowCheckbox ? <FormControlLabel
            sx={{p: 0, justifySelf: 'center',  ml: 0, mt: 5, width: '100%',
              backgroundColor: '#d7e0e6ff',
              '&:hover': {backgroundColor: '#f1c40f'}
              }}
            label="Recovery Of Employee"
            control={<Checkbox checked={checked} onChange={handleCheckboxRecoveryOfEmployee} />}
          /> : null}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
