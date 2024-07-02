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

import { TNewDetail } from "../../types";
import { SubmitButton,  } from '../common/button/button';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { postDetail } from '../../store/api-action';

const INITIAL_VALUES = {
  shortName: '',
  longName: '',
  normOfMinute: undefined,
  customer: '',
};

const VALIDATION_SCHEMA = Yup.object().shape({
  shortName: Yup.string().required("Required"),
  longName: Yup.string().required("Required"),
  normOfMinute: Yup.number(),
  customer: Yup.string().required("Required"),
});

interface DialogAddDetailProps {
  open: boolean;
  onClose?: () => void;
}

export default function DialogAddDetail(props: DialogAddDetailProps): JSX.Element {

  const {open, onClose} = props;
  const dispatch = useAppDispatch();

  const hundlerCloseDialog = () => {
    onClose && onClose();
  }

  const submitFunction = (values: TNewDetail, actions: { setSubmitting: (arg0: boolean) => void; }) => {
    dispatch(postDetail(values))
    toast.success(`Добавлена деталь ${values.shortName}`,
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
          Add Detail
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
                    id="shortName"
                    name="shortName"
                    type="text"
                    placeholder="Short Name"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={1} sx={{p: 1}}>
                  <Field
                    component={TextField}
                    id="longName"
                    name="longName"
                    type="text"
                    placeholder="Long Name"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={1} sx={{p: 1}}>
                  <Field
                    component={TextField}
                    sx={{ width: '100%' }}
                    id="normOfMinute"
                    name="normOfMinute"
                    type="number"
                    placeholder="Norm Of Minute"
                  />
                </Grid>
                <Grid item xs={1} sx={{p: 1}}>
                  <Field
                    component={TextField}
                    id="customer"
                    name="customer"
                    type="text"
                    placeholder="Customer"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={1} sx={{p: 1}}>
                  <SubmitButton sx={{m: 0, width: '100%'}} disabled={values.shortName === '' || values.longName === ''} text='Add Detail'></SubmitButton>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
