import { useRef } from "react";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { IconButton, Menu, MenuItem } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { MenuProps } from '@mui/material/Menu';

import { toast } from 'react-toastify';

import { useAppDispatch } from "../../hooks/useAppDispatch";
import useVisibility from "../../hooks/useVisibility";

import { CustomButton } from "../common/button/button";

import { humanizeDate } from "../../utils/utils";
import { TStoreHouseOperationRDO } from "../../types";
import { deleteStoreHouseOperation, fetchStoreHouseOperation} from "../../store/api-action";
import useQueryStoreOperations from "../../hooks/useQueryStoreOperations";

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

const ControlsColumnStorage = ({ row, fun, opacity }: { row: TStoreHouseOperationRDO, fun: () => void, opacity: boolean }) => {
  const {query} = useQueryStoreOperations();
  const { visibility, toggle, hide } = useVisibility();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLButtonElement>(null);
  
  const hundleClick = (evt: React.MouseEvent<HTMLTableElement>) => {
    const element = evt.target as HTMLElement;
    if (element.classList.contains('MuiBackdrop-root')) {
      fun();
    }
  }

  const hundleDeleteRow = () => {
    dispatch(deleteStoreHouseOperation(row._id))
    .then((data) => { 
      if (data.meta.requestStatus === 'rejected') {
        toast.error(`You must delete all opration Shipment for position ${(row.product.name)} after ${humanizeDate(row.createdAt)}`, {
          position: 'top-center',
          style: {
            background: '#e74c3c',
          }, 
          autoClose: 5000,
        });
      }
      if (data.meta.requestStatus === 'fulfilled') {
        dispatch(fetchStoreHouseOperation(query)); 
      }
    });

    toast.info(`Operation for ${row.typeOperation} for ${humanizeDate(row.createdAt)} deleted`, {
      position: 'top-center',
      style: {
        background: '#e4ba48',
      }, autoClose: 3000,
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
      >
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

export default ControlsColumnStorage;
