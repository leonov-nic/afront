import { useState, useCallback } from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

import { toast } from 'react-toastify';

import { TStoreHouseOperationDTO } from '../../types';
import { SubmitButton,  } from '../common/button/button';
import ToggleButonSelectStorehouseOperation from '../toggle-buton-select-storehouse-operation/toggle-buton-select-storehouse-operation';
import SelectStorehousePosition from '../select-storehouse-position/select-storehouse-position';
import SelectEmployeeStorage from '../select-employee-storage/select-employee-storage';
import SelectFromWhoom from '../select-fromwhoom/select-fromwhoom';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { postStoreHouseOperation } from '../../store/api-action';
import { TypeOperation } from '../../const';

const INITIAL_VALUES = {
  productId: '',
  employeeId: '',
  box: 0,
  amount: 0,
  totalAmount: 0,
  typeOperation: undefined,
  fromWhom: '',
  comment: '',
};

const VALIDATION_SCHEMA = Yup.object().shape({
  productId: Yup.string().required("Required"),
  employeeId: Yup.string().required("Required"),
  box: Yup.number(),
  amount: Yup.number().required("Required"),
  totalAmount: Yup.number().required("Required"),
  typeOperation: Yup.string().required("Required").oneOf(Object.values(TypeOperation)),
  fromWhom: Yup.string().required("Required"),
  comment: Yup.string(),
});

interface DialogAddStorehouseOperationProps {
  open: boolean;
  onClose?: () => void;
}

export default function DialogAddStorehouseOperation(props: DialogAddStorehouseOperationProps): JSX.Element {
  const [operation, setOperation] = useState<string | undefined>(undefined)
  const {open, onClose} = props;
  const dispatch = useAppDispatch();

  const onChangeOperation = useCallback((value: string) => {
    setOperation(value);
    validateTypeOperation(value);
  }, [])

  const hundlerCloseDialog = () => {
    onClose && onClose();
  }

  const validateTypeOperation = (value: string) => {
    if (value == undefined) {
      return 'Select of Type Operation';
    }
    return undefined;
  }

  const submitFunction = (values: TStoreHouseOperationDTO, actions: {setSubmitting: (arg0: boolean) => void}) => {
    if (values.amount && values.box === 0) {values.totalAmount = values.amount}
    if (values.amount && values.box != 0) {values.totalAmount = Number(values.amount) * Number(values.box)}
    dispatch(postStoreHouseOperation(values))
    console.log(values);
    toast.success(`Added operation is ${values.typeOperation}`,
      {style: {background: '#17c1bc',}, autoClose: 3000,}
    );
    actions.setSubmitting(false);
    setTimeout(() => {
      hundlerCloseDialog();
    }, 500);

  }

  return (
    <Dialog onClose={hundlerCloseDialog} open={open}>
      <DialogContent>
        <Stack>
          <IconButton aria-label="close" color="inherit" size="large" sx={{backgroundColor: 'rgba(40, 40, 40, 0.1)', width: 'fit-content', ml: 'auto'}} onClick={hundlerCloseDialog}>
            <Close/>
          </IconButton>
        </Stack>
        <DialogTitle sx={{color: 'gray', textAlign: 'center', textTransform: 'uppercase'}}>
          Add Operation
        </DialogTitle>
        {!operation ? <Typography sx={{color: '#17c1bc', textAlign: 'center'}}>
          Select Of Type Operation
        </Typography> : null}
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={submitFunction}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Grid container columns={2} >
                <Grid item xs={2} sx={{p: 1}}>
                  <ToggleButonSelectStorehouseOperation onChange={onChangeOperation}/>
                </Grid>
                <Grid item xs={1} sx={{p: 1}}>
                  <SelectEmployeeStorage />
                </Grid>
                <Grid item xs={1} sx={{p: 1}}>
                  <SelectStorehousePosition />
                </Grid>
                <Grid item xs={1} sx={{p: 1}}>
                  <Field
                    component={TextField}
                    sx={{ width: '100%' }}
                    id="box"
                    name="box"
                    type="number"
                    placeholder="Box"
                    value={values.box === 0 ? "" : values.box}
                  />
                </Grid>
                <Grid item xs={1} sx={{p: 1}}>
                  <Field
                    component={TextField}
                    sx={{ width: '100%' }}
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="Amount"
                    value={values.amount === 0 ? "" : values.amount}
                  />
                </Grid>
                <Grid item xs={1} sx={{p: 1}}>
                  <Field
                    component={TextField}
                    sx={{ width: '100%' }}
                    id="totalAmount"
                    name="totalAmount"
                    value={values.box && values.amount ? Number(values.box) * Number(values.amount) : values.totalAmount === values.amount ? "" : values.amount}
                    type="number"
                    placeholder="Total amount"
                  />
                </Grid>
                <Grid item xs={1} sx={{p: 1}}>
                  <SelectFromWhoom />
                </Grid>
                <Grid item xs={2} sx={{p: 1}}>
                  <Textarea
                    value={values.comment}
                    variant="outlined"
                    id="comment"
                    name='comment'
                    minRows={3}
                    maxRows={5}
                    placeholder="Comment"
                    onChange={(event) => setFieldValue('comment', event.target.value)}
                  />
                </Grid>
                <Grid item xs={2} sx={{p: 1}}>
                  <SubmitButton sx={{m: 0, width: '100%'}} disabled={values.amount === 0 || values.typeOperation === undefined} text='Add Operation'></SubmitButton>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
