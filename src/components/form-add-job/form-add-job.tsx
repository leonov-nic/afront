
import Stack from '@mui/material/Stack';

import { Formik, Field, Form } from 'formik';
import { TextField } from "formik-mui";
import * as Yup from 'yup';

import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import { TJob } from '../../types';
import { getNewTimeInDate } from '../../utils/utils';

import { SubmitButton } from '../common/button/button';
import ButtonTimeOfJob from '../button-time-of-job/button-time-of-job';
import SelectTime from '../select-time/select-time';
import SelectEmployee from '../select-employee/select-employee';
import SelectDetail from '../select-detail/select-detail';
import SelectTypeOfJob from '../select-type-of-job/select-type-of-job';
import CustomTextarea from '../custom-textarea/custom-textarea';
import LunchSwitch from '../lunch-switch/lunch-switch';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getUser } from '../../store/user-process/user-process';
import { postJob, fetchJobs } from '../../store/api-action';
import { baseQuery, setJobBoxOne, setJobBoxTwo } from '../../const';


// export type TINITIAL_VALUES = {
//   employeeId: string;
//   timeFrom: string | undefined;
//   timeTo: string | undefined;
//   detailId: string;
//   typeOfJob: string;
//   extra: undefined;
//   quantity: undefined;
//   master: string;
//   comment: string;
// }

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
  isLunch: true,
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
  isLunch: Yup.boolean(),
});

export default function FormAddJob(): JSX.Element {
  console.log('Form add job');
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  const validateQuantity = (value: number) => {
    if (value == undefined) {
      return 'Quantity must be';
    }
    return undefined;
  };

  const submitFunction = (values: TJob, actions: { setSubmitting: (arg0: boolean) => void; resetForm: (arg0: { employeeId: string; timeFrom: string; timeTo: string; detailId: string; typeOfJob: string; extra: undefined; quantity: undefined; comment: string; master: string; isLunch: boolean}) => void; }) => {
    user ? values.master = user._id : values.master = '';
    if (!setJobBoxOne.has(values.typeOfJob)) {
      values.timeFrom = dayjs(getNewTimeInDate(`${values.timeFrom && values.timeFrom}`)).format('YYYY-MM-DDTHH:mm:ssZ')
      values.timeTo = dayjs(getNewTimeInDate(`${values.timeTo && values.timeTo}`)).format('YYYY-MM-DDTHH:mm:ssZ')
      
    } else {
      values.timeFrom = '-';
      values.timeTo = '-';
    }

    dispatch(postJob(values))
    .then((data) => { if (data.meta.requestStatus === 'fulfilled') 
      dispatch(fetchJobs(baseQuery))
    });

    toast.success(`Job added successfully`, {
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
            <ButtonTimeOfJob/>
            <SelectEmployee />
            <SelectTime name="timeFrom"></SelectTime>
            <LunchSwitch/>
            <SelectTime name="timeTo"></SelectTime>
            <SelectDetail/>
            <SelectTypeOfJob name="typeOfJob"/>
            <Field
              component={TextField}
              sx={{ maxWidth: 90}}
              id="extra"
              type="number"
              name="extra"
              placeholder="Extra"
              value={values.extra === undefined ? '' : values.extra}
              disabled={setJobBoxOne.has(values.typeOfJob) || setJobBoxTwo.has(values.typeOfJob)} 
            />
            <Field
              component={TextField}
              sx={{ maxWidth: 90}}
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Quantity"
              validate={validateQuantity}
              value={values.quantity === undefined ? '' : values.quantity}
              disabled={setJobBoxOne.has(values.typeOfJob) || setJobBoxTwo.has(values.typeOfJob)} 
            />
            <CustomTextarea/>
            <SubmitButton sx={{marginRight: 'auto'}} text='Write'></SubmitButton>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
