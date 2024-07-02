import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useFormikContext } from "formik";
import { SxProps, Theme } from '@mui/material/styles';
import { ReactNode } from 'react';

interface ButtonEnterProps {
  top?: string;
}

export const ButtonEnter = styled(Button)<ButtonEnterProps>(({ ...props }) => ({
  color: 'white',
  padding: '15px',
  backgroundColor: '#17c1bc',
  '&:hover': {
    backgroundColor: '#128682'
  },
  fontFamily: 'Inter',
  fontWeight: '700',
  top: props.top,
  m: 0,
  minWidth: 80,
}));

type SubmitButtonProps = {
  text?: string
  sx?: SxProps<Theme>;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  data?: string;
}

export const CustomButton = ({ text, sx=[], children, onClick, disabled, data}: SubmitButtonProps) => {
  return (
    <Button
      data-set={data}
      disabled={disabled}
      onClick={onClick}
      type="button"
      sx={[{minWidth: 80, m: 0,
        backgroundColor: '#17c1bc',
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Inter',
        borderRadius: 0,
        '&:hover': {backgroundColor: '#247cc1'}}, ...(Array.isArray(sx) ? sx : [sx]),]}
    >
      {text}{children}
    </Button>
  );
};

export const SubmitButton = ({ text, sx=[], disabled }: SubmitButtonProps) => {
  const { isSubmitting } = useFormikContext();
  return (
    <Button
      type="submit"
      className="secondary"
      disabled={isSubmitting || disabled}
      sx={[
        {px: 4, py: 1.95, m: 0, top: '-1px',
        backgroundColor: '#17c1bc',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: 0,
        ts: 5,
        '&:hover': {backgroundColor: '#128682'}}, ...(Array.isArray(sx) ? sx : [sx]),]}
    >
      {text}
    </Button>
  );
};
