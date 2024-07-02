import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

import { toast } from 'react-toastify';

import { TNewEmployee } from "../../types";
import { SubmitButton,  } from '../common/button/button';
import SelectTypeOfJob from '../select-type-of-job/select-type-of-job';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { postEmployee } from '../../store/api-action';

const INITIAL_VALUES = {
  familyName: '',
  registrationNumber: undefined,
  mainJob: 'n',
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

export default function DialogAddEmployee(props: DialogAddEmployeeProps): JSX.Element {
  const {open, onClose} = props;
  const dispatch = useAppDispatch();

  const hundlerCloseDialog = () => {
    onClose && onClose();
  }

  const submitFunction = (values: TNewEmployee, actions: { setSubmitting: (arg0: boolean) => void; }) => {
    values.mainJob = values.typeOfJob;
    delete values.typeOfJob;
    dispatch(postEmployee(values))

    toast.success(`Добавлен сотрудник ${values.familyName}`,
      {
        style: {background: '#17c1bc',}
      }
    );
    actions.setSubmitting(false);
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
          Add Employee
        </DialogTitle>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={submitFunction}
        >
          {({ values }) => (
            <Form>
              <Grid container columns={1} >
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
                  <SelectTypeOfJob name='typeOfJob' sx={{maxWidth: '100%', width: '100%'}}/>
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
                  <SubmitButton
                    sx={{m: 0, width: '100%'}}
                    disabled={values.familyName === '' ||
                    values.registrationNumber === undefined ||
                    values.typeOfJob === undefined}
                    text='Add Employee'>
                  </SubmitButton>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

