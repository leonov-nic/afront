import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

import { toast } from 'react-toastify';

import { TEditEmployee } from "../../types";
import { SubmitButton,  } from '../common/button/button';
import SelectTypeOfJob from '../select-type-of-job/select-type-of-job';
import SelectEmployee from '../select-employee/select-employee';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { editEmployee } from '../../store/api-action';

const INITIAL_VALUES = {
  familyName: '',
  registrationNumber: undefined,
  mainJob: 'kd',
  _id: undefined,
};

const VALIDATION_SCHEMA = Yup.object().shape({
  familyName: Yup.string().required("Required"),
  registrationNumber: Yup.number().required("Required"),
  mainJob: Yup.string().required("Required"),
});


export interface DialogAddEmployeeProps {
  open: boolean;
  onClose?: () => void;
}

export default function DialogEditEmployee(props: DialogAddEmployeeProps): JSX.Element {
  const {open, onClose} = props;
  const dispatch = useAppDispatch();

  const hundlerCloseDialog = () => {
    onClose && onClose();
  }

  const submitFunction = (values: TEditEmployee) => {
    values.mainJob = values.typeOfJob;
    values._id = values.employeeId;
    delete values.typeOfJob;
    delete values.employeeId;
    dispatch(editEmployee(values));

    toast.success(`Cотруднику ${values.familyName} внесены изменения`,
      {
        style: {background: '#17c1bc',}
      }
    );
    setTimeout(() => {
      hundlerCloseDialog();
    }, 300);
  }

  return (
    <Dialog onClose={onClose} open={open} >
      <DialogContent>
        <Stack>
          <IconButton aria-label="close" color="inherit" size="large" sx={{backgroundColor: 'rgba(40, 40, 40, 0.1)', width: 'fit-content', ml: 'auto'}} onClick={hundlerCloseDialog}>
            <Close/>
          </IconButton>
        </Stack>
        <DialogTitle sx={{color: 'gray', textAlign: 'center', textTransform: 'uppercase'}}>
          Select An Employee To Edit
        </DialogTitle>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={submitFunction}
        >
          <Form>
            <Grid container columns={1} >
              <Grid item xs={1} sx={{p: 1,  width: '100%' }}>
                <SelectEmployee sx={{maxWidth: '100%', mx: 0 }}/>
              </Grid>
              <Grid item xs={1} sx={{p: 1}}>
                <Field
                  component={TextField}
                  id="familyName"
                  name="familyName"
                  type="text"
                  placeholder="Family and Name"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={1} sx={{p: 1}}>
                <SelectTypeOfJob name='typeOfJob' sx={{minWidth: '100%', marginLeft: '0'}}/>
              </Grid>
              <Grid item xs={1} sx={{p: 1}}>
                <Field
                  component={TextField}
                  sx={{ width: '100%' }}
                  id="registrationNumber"
                  type="number"
                  name="registrationNumber"
                  placeholder="Reg Number"
                />
              </Grid>
              <Grid item xs={1} sx={{p: 1}}>
                <SubmitButton sx={{m: 0, width: '100%'}} text='Edit'></SubmitButton>
              </Grid>
              <Grid item xs={2}>
                <Box
                  sx={{display: 'flex', px: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                  }}>
                </Box>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

