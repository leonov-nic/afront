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

import { STORE_HOUSE_TYPES } from '../../const';
import { TStoreHouseDTO } from '../../types';
import { SubmitButton,  } from '../common/button/button';
import SelectStorehouseType from '../select-storehouse-type/select-storehouse-type';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { postStoreHouse } from '../../store/api-action';

const INITIAL_VALUES = {
  name: '',
  company: '',
  characteristics: '',
  size: '',
  diameter: 0,
  type: '',
  price: 0,
  currentQuantity: 0,
};

const VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required("Required"),
  company: Yup.string().required("Required"),
  characteristics: Yup.string().max(100, 'Too Long!'),
  size: Yup.string(),
  diameter: Yup.number(),
  type: Yup.string().max(20, 'Too Long!').oneOf(STORE_HOUSE_TYPES, 'Invalid type!').required("Required"),
  price: Yup.number(),
  currentQuantity: Yup.number(),
});

interface DialogAddToStorageProps {
  open: boolean;
  onClose?: () => void;
}

export default function DialogAddToStorage(props: DialogAddToStorageProps): JSX.Element {
  const {open, onClose} = props;
  const dispatch = useAppDispatch();

  const hundlerCloseDialog = () => {
   onClose && onClose();
  }

  const submitFunction = (values: TStoreHouseDTO, actions: { setSubmitting: (arg0: boolean) => void; }) => {
    const sub = Object.values(values).filter(Boolean).join(', ')
    dispatch(postStoreHouse(values))
    toast.success(`Добавлена позиция: ${sub}`,
      {style: {background: '#17c1bc',}, autoClose: 4000,}
    );
    actions.setSubmitting(false);
    setTimeout(() => {
      hundlerCloseDialog();
    }, 500);
  }

  return (
    <Dialog onClose={hundlerCloseDialog} open={open} >
      <DialogContent>
        <Stack>
          <IconButton aria-label="close" color="inherit" size="large" sx={{backgroundColor: 'rgba(40, 40, 40, 0.1)', width: 'fit-content', ml: 'auto'}} onClick={hundlerCloseDialog}>
            <Close/>
          </IconButton>
        </Stack>
        <DialogTitle sx={{color: 'gray', textAlign: 'center', textTransform: 'uppercase'}}>
          Add Position to Storage
        </DialogTitle>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={submitFunction}
        >
          {({ values }) => (
            <Form>
              <Grid container columns={2} >
                <Grid item xs={1} sx={{p: 1}}>
                  <Field
                    component={TextField}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={1} sx={{p: 1}}>
                  <Field
                    component={TextField}
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Company"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={1} sx={{p: 1}}>
                  <Field
                    component={TextField}
                    id="characteristics"
                    name="characteristics"
                    type="text"
                    placeholder="Characteristics"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={1} sx={{p: 1}}>
                  <Field
                    component={TextField}
                    sx={{ width: '100%' }}
                    id="size"
                    name="size"
                    type="text"
                    placeholder="Size"
                  />
                </Grid>
                <Grid item xs={1} sx={{p: 1}}>
                  <Field
                    component={TextField}
                    sx={{ width: '100%' }}
                    id="diameter"
                    name="diameter"
                    type="number"
                    placeholder="Diameter"
                    value={values.diameter === 0 ? '' : values.diameter}
                  />
                </Grid>
                <Grid item xs={1} sx={{p: 1}}>
                  <SelectStorehouseType />
                </Grid>
                <Grid item xs={1} sx={{p: 1}}>
                  <Field
                    component={TextField}
                    sx={{ width: '100%' }}
                    id="price"
                    name="price"
                    value={values.price === 0 ? '' : values.price}
                    type="number"
                    placeholder="Price"
                  />
                </Grid>
                <Grid item xs={1} sx={{p: 1}}>
                  <SubmitButton 
                    sx={{m: 0, width: '100%'}} 
                    disabled={values.name === '' || values.type === '' || values.company === ''} 
                    text='Add Position'>
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
