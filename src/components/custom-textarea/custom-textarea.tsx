import { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Textarea from '@mui/joy/Textarea';

import { TJob } from '../../types';

export default function CustomTextarea(): JSX.Element {
  const [isSwitched, setSwitch] = useState(Boolean);
  const { setFieldValue, values, isSubmitting } =  useFormikContext<TJob>();

  const handleToggleCommentWindow = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSwitch(evt.target.checked);
  }

  useEffect(() => {
    if (isSubmitting && isSwitched) {
      setSwitch(false);
    }
  }, [isSubmitting, isSwitched]);

  return (
    <Box sx={{display: "flex", flexDirection: "row", alignItems: 'flex-start', marginBottom: 'auto', position: 'relative', zIndex: 1}}>
      <FormControlLabel control={<Switch checked={isSwitched} onChange={handleToggleCommentWindow}/>} label="Comment" sx={{color: 'gray', textTransform: 'capitalize',  p: 0}}/>

      {isSwitched &&
        <Textarea
          value={values.comment}
          variant="outlined"
          id="comment"
          name='comment'
          minRows={4}
          sx={{position: 'absolute', l: 0, top: '150%'}}
          maxRows={6}
          onChange={(event) => setFieldValue('comment', event.target.value)}
        />
      }
    </Box>
  );
}
