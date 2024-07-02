import 'react-toastify/dist/ReactToastify.css';
import { TSubmitUser } from '../../types';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import { toast } from 'react-toastify';
import { useState } from 'react';

import Box from '@mui/material/Box';

import { ButtonEnter } from '../common/button/button';

import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { loginUser } from '../../store/api-action';
import './form-main.css';
import { useForm  } from 'react-hook-form';

export default function FormMain(): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSubmitUser>({defaultValues: {email: '', password: ''}, mode: 'onChange'})

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmitForm = (data: TSubmitUser) => {
    dispatch(loginUser(data))
    .then((res) => {if (res.meta.requestStatus === 'rejected') toast.error('Введите верный логин или пароль');});
  };

  return (

    <Box
      component="form"
      sx={{'& .MuiTextField-root': { m: 1, width: '29ch', color: 'black' },}}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(handleSubmitForm)}
    >

      <FormControl sx={{ m: 1, width: '29ch' }} variant="filled">
        <InputLabel htmlFor="email">Login</InputLabel>
        <OutlinedInput id="email" type="email" label="Login" autoComplete='off'
          {...register("email", {required: 'Укажите логин-почту'})}
          error={Boolean(errors.email?.message)}

        />
      </FormControl>

      <FormControl sx={{ m: 1, width: '29ch' }} variant="filled">
        <InputLabel htmlFor="password">Password</InputLabel>

        <OutlinedInput
          id="password"
          type={showPassword ? 'text' : 'password'}
          {...register("password", {required: 'Укажите пароль'})}

          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="start"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="password"

        />
      </FormControl>

      <FormControl sx={{ m: 1, width: '29ch' }} variant="filled">
        <ButtonEnter type="submit" top="10px">time to work</ButtonEnter>
      </FormControl>
    </Box>
  );
}
