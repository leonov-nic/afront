// import { Select } from "formik-mui";
// import { MenuItem } from "@mui/material";
// import { Field } from "formik";

import { typesJob, TypesOfJob } from "../../const";
import { TTypeOfJob, TJob } from "../../types";
import { SxProps, Theme } from '@mui/material/styles';

// import { AutocompleteRenderInputParams } from "@mui/material/Autocomplete";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import { Autocomplete } from 'formik-mui';
import { useFormikContext } from 'formik';


type SelectTypeOfJobProps = {
  name: string;
  sx?: SxProps<Theme>;
}


// export default function SelectTypeOfJob({name,  sx = []}: SelectTypeOfJobProps):JSX.Element {
//   return (
//     <Field
//       name={name}
//       component={Autocomplete}
//       sx={[{ minWidth: 150, width: '100%', maxWidth: 200, display: 'inline-flex', marginLeft: '10px'}, ...(Array.isArray(sx) ? sx : [sx]),]}
//       options={typesJob}
//       getOptionLabel={(option: TTypeOfJob) => `${option && option.name}`}
//       renderInput={(params: AutocompleteRenderInputParams) => (
//         <TextField
//           {...params}
//           name={name}
//           placeholder='Type Of Job'
//         />
//       )}
//     />
//   );
// }


// export default function SelectTypeOfJob({name,  sx = []}: SelectTypeOfJobProps):JSX.Element {
//   return (
//     <Field
//       component={Select}
//       name={name}
//       sx={[{minWidth: 150, width: '100%', maxWidth: 200}, ...(Array.isArray(sx) ? sx : [sx]),]}
//       displayEmpty
//     >
//       <MenuItem value="" sx={{width: '100%'}}><span style={{color: "gray"}} className="label-form">Type Of Job</span></MenuItem>
//       {Object.entries(TypesOfJob).map(([key, value]) => (
//         <MenuItem key={key} value={key}>
//           {`${value.name} / ${value.longName}`}
//         </MenuItem>
//       ))}
//     </Field>
//   );
// }


export default function SelectTypeOfJob({name, sx = []}: SelectTypeOfJobProps): JSX.Element {
  const { setFieldValue, values } = useFormikContext<TJob>();

  return (
    <Autocomplete
      value={values.typeOfJob ? TypesOfJob[values.typeOfJob] : null}
      id={name}
      sx={[{ minWidth: 150, width: '100%', maxWidth: 200, display: "inline-flex"}, ...(Array.isArray(sx) ? sx : [sx]),]}
      options={typesJob}
      autoComplete={false}
      fullWidth={true}
      getOptionLabel={(option: TTypeOfJob) => `${option.name} / ${option.longName}`}
      isOptionEqualToValue={(option: TTypeOfJob, value: TTypeOfJob) => option.name === value.name && option.longName === value.longName}
      onChange={(_event, value) => {
        value && setFieldValue(`${name}`, value.name);
      }}

      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          placeholder={`${values.typeOfJob ? values.typeOfJob : "Type Of Job"}`}
        />
      )}
    />
  );
}

