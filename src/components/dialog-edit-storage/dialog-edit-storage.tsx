import { useState } from 'react';
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
import { TStoreEditDTO } from '../../types';
import { SubmitButton,  } from '../common/button/button';
import { CustomButton } from '../common/button/button';
import SelectStorehouseType from '../select-storehouse-type/select-storehouse-type';
import SelectStorehousePosition from '../select-storehouse-position/select-storehouse-position';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { editStoreHouse } from '../../store/api-action';

const INITIAL_VALUES: TStoreEditDTO = {
  productId: '',
  name: '',
  company: '',
  characteristics: '',
  size: '',
  diameter: 0,
  type: '',
  price: 0,
};

const VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required("Required"),
  company: Yup.string().required("Required"),
  characteristics: Yup.string().max(100, 'Too Long!'),
  size: Yup.string(),
  diameter: Yup.number(),
  type: Yup.string().max(20, 'Too Long!').oneOf(STORE_HOUSE_TYPES, 'Invalid type!').required("Required"),
  price: Yup.number(),
});

interface DialogEditStorageProps {
  open: boolean;
  onClose?: () => void;
}

interface SubmitActions {
  setSubmitting: (isSubmitting: boolean) => void;
  setValues: (values: TStoreEditDTO) => void;
}

export default function DialogEditStorage(props: DialogEditStorageProps): JSX.Element {
  const {open, onClose} = props;
  const [typeForm, setTypeForm] = useState<'none' | 'edit' | 'delete'>('none');
  const dispatch = useAppDispatch();
  const isEdit = typeForm === 'edit';
  const isDelete = typeForm === 'delete';
  const isNone= typeForm === 'none';

  const hundlerCloseDialog = () => {
   onClose && onClose();
   setTimeout(() => {
    setTypeForm('none')
   }, 300);
  }

  const onSelectTypeDelete = () => {
    setTypeForm('delete')
  }

  const onSelectTypeEdit = () => {
    setTypeForm('edit')
   }

  const submitFunction = (values: TStoreEditDTO, actions: SubmitActions) => {
    const sub = Object.values(values).filter(Boolean).join(', ')
    if(isDelete) {
      // dispatch(deleteStoreHouse(values.productId));
      actions.setValues(INITIAL_VALUES);
      toast.success(`Deleted position: ${values.name}`,
        {style: {background: '#17c1bc',}, autoClose: 4000,}
      );
    }

    if(isEdit) {
      dispatch(editStoreHouse(values));
      toast.success(`Edited position: ${sub}`,
        {style: {background: '#17c1bc',}, autoClose: 4000,}
      );
    }

    actions.setSubmitting(false);
    setTimeout(() => {
      hundlerCloseDialog();
    }, 500);
  }

  return (
    <Dialog onClose={hundlerCloseDialog} open={open} >
      <DialogContent>
        <Stack>
          <IconButton 
            aria-label="close" 
            color="inherit" size="large" sx={{backgroundColor: 'rgba(40, 40, 40, 0.1)', 
            width: 'fit-content', ml: 'auto'}} 
            onClick={hundlerCloseDialog}>
            <Close/>
          </IconButton>
        </Stack>
        <Grid container columns={2} >
          <Grid item xs={2} sx={{p: 1}}>
            {isNone && <DialogTitle sx={{color: 'gray', textAlign: 'center', textTransform: 'uppercase'}}>
              Would you like to Deactivate or Edit <br/>a position?
            </DialogTitle>}
          </Grid>
          {isNone || isEdit ? <Grid item xs={isEdit ? 2 : 1} sx={{p: 1}}>
            <CustomButton
              onClick={onSelectTypeDelete}
              sx={{
                position: 'relative',
                display: 'flex',
                fontSize: '12px',
                color: 'white', 
                backgroundColor: '#247cc1',
                borderRadius: 1.5,
                boxShadow: "none", py: 1.7, px: 3, mx: 0.5, 
                width: '100%',
                '&:hover': {backgroundColor: '#7690a0'}
              }}>{isEdit ? 'Click here to Deactivate' : 'Deactivate'}
            </CustomButton>
          </Grid> : null}
          {isNone || isDelete ? <Grid item xs={isDelete ? 2 : 1} sx={{p: 1}}>
            <CustomButton
              onClick={onSelectTypeEdit}
              sx={{
                position: 'relative',
                display: 'flex',
                fontSize: '12px',
                color: 'white', 
                backgroundColor: '#247cc1',
                borderRadius: 1.5,
                boxShadow: "none", py: 1.7, px: 3, mx: 0.5, 
                width: '100%',
                '&:hover': {backgroundColor: '#7690a0'}
              }}>{isDelete ? 'Click here to Edit' : 'Edit'}
            </CustomButton>
          </Grid> : null}
        </Grid>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={submitFunction}
        >

          {({ values }) => (
            <Form>
              { 
                isEdit ? <>
                  <Grid container columns={2} >
                    <Grid item xs={2} sx={{p: 1}}>
                      <SelectStorehousePosition />
                    </Grid>
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
                        text='Edit Position'>
                      </SubmitButton>
                    </Grid>
                  </Grid>
                </> : isDelete ?
                <>
                  <Grid container columns={2} >
                    <Grid item xs={2} sx={{p: 1}}>
                      <SelectStorehousePosition />
                    </Grid>
                    <Grid item xs={2} sx={{p: 1}}>
                      <SubmitButton 
                        sx={{m: 0, width: '100%'}} 
                        disabled 
                        text='Deactivate Position Пока не работает'>
                      </SubmitButton>
                    </Grid>
                  </Grid>
                </> : null
              }
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>

  );
}
