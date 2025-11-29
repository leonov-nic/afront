import { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';

import Box from '@mui/material/Box';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import { setJobBoxOne } from '../../const';

import { TJob } from '../../types';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#17c1bc',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#17c1bc',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#17c1bc',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));

export default function LunchSwitch(): JSX.Element {
  const [isSwitched, setSwitch] = useState<boolean>(true);
  const { values, isSubmitting, setValues } =  useFormikContext<TJob>();

  const handleToggleCommentWindow = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values, isLunch: evt.target.checked});
    setSwitch(evt.target.checked);
  }

  useEffect(() => {
    if (isSubmitting) {
      setSwitch(true);
    }
  }, [isSubmitting]);

  return (
    <Box sx={{display: "flex", p: 0, minWidth: 73, sflexDirection: "column", alignItems: 'flex-start', alignContent: "center", marginBottom: 'auto', position: 'relative', zIndex: 3}}>
      <IOSSwitch checked={isSwitched} disabled={setJobBoxOne.has(values.typeOfJob)} sx={{ mb: isSwitched ? 0.45 : 0.7 }} inputProps={{ 'aria-label': 'lunch' }} onChange={handleToggleCommentWindow}/>
      <Typography 
        sx={{ display: "flex", p: 0, flexDirection: "row", 
          alignItems: 'center', fontSize: "0.8rem", color: "gray" 
        }}>
        {isSwitched ? <LunchDiningIcon sx={{mr: 0.3}}/> : <span style={{fontWeight: 'bold', marginRight: "2px"}}>No</span>} lunch</Typography>
    </Box>
  );
}
