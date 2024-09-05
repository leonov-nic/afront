
import Stack from '@mui/material/Stack';
import { Formik, Field, Form } from 'formik';
import { TextField } from "formik-mui";
import * as Yup from 'yup';

import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import { TJob } from '../../types';
import { getNewTimeInDate } from '../../utils/utils';

import { SubmitButton } from '../common/button/button';
import SelectTime from '../select-time/select-time';
import SelectEmployee from '../select-employee/select-employee';
import SelectDetail from '../select-detail/select-detail';
import SelectTypeOfJob from '../select-type-of-job/select-type-of-job';
import CustomTextarea from '../custom-textarea/custom-textarea';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getUser } from '../../store/user-process/user-process';
import { postJob, fetchJobs } from '../../store/api-action';
import { baseQuery } from '../../const';

const INITIAL_VALUES = {
  employeeId: '',
  timeFrom: '',
  timeTo: '',
  detailId: '',
  typeOfJob: '',
  extra: undefined,
  quantity: undefined,
  comment: '',
  master: '',
};

const VALIDATION_SCHEMA = Yup.object().shape({
  employeeId: Yup.string().required("Fill field"),
  timeFrom: Yup.string().required("Fill field"),
  timeTo: Yup.string().required("Fill field"),
  detailId: Yup.string().required("Fill field"),
  typeOfJob: Yup.string().required("Fill field"),
  extra: Yup.number(),
  quantity: Yup.number().required("Fill field"),
  comment: Yup.string(),
});

export default function FormAddJob(): JSX.Element {
  console.log('Form add job');
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  const validateQuantity = (value: number) => {
    if (value === 0 || value == undefined) {
      return 'Quantity must be greater than 0';
    }
    return undefined;
  }

  const submitFunction = (values: TJob, actions: { setSubmitting: (arg0: boolean) => void; resetForm: (arg0: { employeeId: string; timeFrom: string; timeTo: string; detailId: string; typeOfJob: string; extra: undefined; quantity: undefined; comment: string; master: string; }) => void; }) => {
    user ? values.master = user._id : values.master = '';
    values.timeFrom = dayjs(getNewTimeInDate(`${values.timeFrom && values.timeFrom}`)).format('YYYY-MM-DDTHH:mm:ssZ')
    values.timeTo = dayjs(getNewTimeInDate(`${values.timeTo && values.timeTo}`)).format('YYYY-MM-DDTHH:mm:ssZ')
    dispatch(postJob(values))
    .then((data) => { if (data.meta.requestStatus === 'fulfilled') 
      dispatch(fetchJobs(baseQuery))
    });

    toast.success(`Работа успешно добавлена`, {
      position: 'top-center',
      style: {
        background: '#17c1bc',
      },
    });
    actions.setSubmitting(false);
    actions.resetForm(INITIAL_VALUES);
  }

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={submitFunction}
    >
      {({values}) => (
        <Form autoComplete="off">
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" alignItems="center">
            <SelectEmployee />
            <SelectTime name="timeFrom"></SelectTime>
            <SelectTime name="timeTo"></SelectTime>
            <SelectDetail/>
            <SelectTypeOfJob name="typeOfJob"/>
            <Field
              component={TextField}
              sx={{ maxWidth: 100}}
              id="extra"
              type="number"
              name="extra"
              placeholder="Extra"
              value={values.extra === undefined ? '' : values.extra}
            />
            <Field
              component={TextField}
              sx={{ maxWidth: 100}}
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Quantity"
              validate={validateQuantity}
              value={values.quantity === undefined ? '' : values.quantity}
            />
            <CustomTextarea/>
            <SubmitButton sx={{marginRight: 'auto'}} text='Write'></SubmitButton>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
