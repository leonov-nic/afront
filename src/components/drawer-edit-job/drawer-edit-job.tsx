import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
// import Box from '@mui/material/Box';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import Grid from '@mui/material/Grid';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

import { toast } from 'react-toastify';
import dayjs from 'dayjs';

import Container from '../common/container/container';
import { TJobRDO, TUpdateJob } from "../../types";
import { SubmitButton,  } from '../common/button/button';
import SelectTime from '../select-time/select-time';
import SelectEmployee from '../select-employee/select-employee';
import SelectDetail from '../select-detail/select-detail';
import SelectTypeOfJob from '../select-type-of-job/select-type-of-job';
import CustomTextarea from '../custom-textarea/custom-textarea';

import { getDayAndMonth, getHours, getNewTimeInDate } from '../../utils/utils';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { editJob } from '../../store/api-action';

import Drawer from '@mui/material/Drawer';

// const INITIAL_VALUES = {
//   employeeId: '',
//   timeFrom: '',
//   timeTo: '',
//   detailId: '',
//   typeOfJob: '',
//   extra: undefined,
//   quantity: undefined,
//   comment: '',
//   master: '',
// };

const VALIDATION_SCHEMA = Yup.object().shape({
  employeeId: Yup.string().required("Required"),
  timeFrom: Yup.string().required("Required"),
  timeTo: Yup.string().required("Required"),
  detailId: Yup.string().required("Required"),
  typeOfJob: Yup.string().required("Required"),
  quantity: Yup.number().required("Required").typeError("Quantity must be a number"),
  comment: Yup.string(),
});

export interface DrawerEditJobProps {
  open: boolean;
  onClose: () => void;
  row: TJobRDO;
}

export default function DrawerEditJob(props: DrawerEditJobProps): JSX.Element {
  const {open, onClose, row} = props;

  const {employee, timeFrom, timeTo, master, ...newRow} = row;
  const modifiedRow = {
    ...newRow,
    timeFrom: getHours(timeFrom),
    timeTo: getHours(timeTo),
    master: master._id
  };

  delete modifiedRow.totalHours;
  delete modifiedRow.detail;

  const dispatch = useAppDispatch();
  const hundlerCloseDialog = () => {
    onClose();
  }

  const submitFunction = (values: TUpdateJob) => {
    values.timeFrom = dayjs(getNewTimeInDate(`${values.timeFrom && values.timeFrom}`)).format('YYYY-MM-DDTHH:mm:ssZ')
    values.timeTo = dayjs(getNewTimeInDate(`${values.timeTo && values.timeTo}`)).format('YYYY-MM-DDTHH:mm:ssZ')
    dispatch(editJob(values));

    toast.success(`Работа сотрудника ${employee} успешно изменена`,
      {style: {background: '#17c1bc',}});
    setTimeout(() => {
      hundlerCloseDialog();
    }, 300);
  }

  return (
    <Drawer onClose={onClose} open={open} anchor="top" sx={{zIndex: 10}}>
      <Stack padding={1}>
        <IconButton aria-label="close" color="inherit" size="large" sx={{backgroundColor: 'rgba(40, 40, 40, 0.1)', width: 'fit-content', ml: 'auto'}} onClick={hundlerCloseDialog}>
          <Close/>
        </IconButton>
      </Stack>
      <Container>
        <p style={{margin: "0 0 30px", color: "gray", textAlign: "center",
            textTransform: 'uppercase', fontSize: "18px"}}>
              <span style={{color: "#e4ba48", fontWeight: "bold"}}>Editing </span>
              the work of <span style={{color: "#e4ba48", fontWeight: "bold"}}>{employee.familyName} </span>
              for {getDayAndMonth(props.row.createdAt)}
        </p>
      </Container>
      <Container $mb='40px'>
        <Formik
          initialValues={modifiedRow}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={submitFunction}
        >

          <Form autoComplete="off">
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" alignItems="center" sx={{marginLeft: '10px', marginRight: '10px'}} >
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
              />
              <Field
                component={TextField}
                sx={{ maxWidth: 100}}
                id="quantity"
                name="quantity"
                type="number"
                placeholder="Quantity"
              />
              <CustomTextarea/>
              <SubmitButton text='Write'></SubmitButton>
            </Stack>
          </Form>

        </Formik>
      </Container>
    </Drawer>
  );
}
