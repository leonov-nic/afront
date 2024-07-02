import { useRef } from "react";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { IconButton, Menu, MenuItem } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { MenuProps } from '@mui/material/Menu';

import { toast } from 'react-toastify';

import { humanizeDate } from "../../utils/utils";
import useVisibility from "../../hooks/useVisibility";
import { CustomButton } from "../common/button/button";
import ButtonOpenDrawerEditJob from "../button-open-drawer-edit-job/button-open-drawer-edit-job";
import { TJobRDO } from "../../types";

import { deleteJob } from "../../store/api-action";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{vertical: -10, horizontal: 20,}}
    transformOrigin={{vertical: -9, horizontal: 150}}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 5,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      zIndex: 1,
      padding: '5px',
    },
    '& .MuiMenuItem-root': {
      minWidth: '120px',
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const ControlsColumn = ({ row, fun, opacity }: { row: TJobRDO, fun: () => void, opacity: boolean }) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLButtonElement>(null);

  const { visibility, toggle, hide } = useVisibility();

  const hundleClick = (evt: React.MouseEvent<HTMLTableElement>) => {
    const element = evt.target as HTMLElement;
    if (element.classList.contains('MuiBackdrop-root')) {
      fun();
    }
  }

  const hundleDeleteRow = () => {
    dispatch(deleteJob(row._id));
    toast.info(`Работа для ${row.employee.familyName} за ${humanizeDate(row.createdAt)} удалена`, {
      position: 'top-center',
      style: {
        background: '#e4ba48',
      },
    });
  }

  return (
    <>
      <IconButton style={{opacity: `${opacity ? "1" : "0.1"}`, color: `${opacity ? "#17c1bc" : "gray"}`}} sx={{p: 0.5, zIndex: 5,}} ref={ref} onClick={toggle}>
        <DragIndicatorIcon/>
      </IconButton>
      <StyledMenu
        open={visibility}
        onClose={hide}
        anchorEl={ref.current}
        onClick={hundleClick}
        sx={{zIndex: 8}}
        // sx={{backgroundColor: 'rgba(116, 190, 18, 0.2)', zIndex: 8}}
      >
        <MenuItem sx={{p: 0.1}}>
          <ButtonOpenDrawerEditJob row={row}></ButtonOpenDrawerEditJob>
        </MenuItem>
        <MenuItem sx={{p: 0.1}} >
          <CustomButton
            sx={{p: 1, width: '100%', backgroundColor: 'transparent',
            '&:hover': {backgroundColor: 'rgba(40, 40, 40, 0.2)', color: 'white'},
            color: '#e44848', fontSize: '12px'}}
            onClick={hundleDeleteRow}
            data={row._id}
          >
            Delete
          </CustomButton>
        </MenuItem>
      </StyledMenu>
    </>
  );
};

export default ControlsColumn;
