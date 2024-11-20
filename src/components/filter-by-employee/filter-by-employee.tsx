import { useRef, useCallback } from "react";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Fade from '@mui/material/Fade';
import { toast } from 'react-toastify';
import { IconButton, Menu, MenuItem } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { MenuProps } from '@mui/material/Menu';

import { useAppSelector } from "../../hooks/useAppSelector";
import { getEmployees } from "../../store/job-process/job-process";
import useVisibility from "../../hooks/useVisibility";

import { TJobRDO } from "../../types";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    PaperProps={{
      style: {
        maxHeight: '220px',
        maxWidth: '150px',
        overflowY: 'auto',
      },
    }}
    id="fade-menu"
    MenuListProps={{
        'aria-labelledby': 'fade-button',
    }}
    TransitionComponent={Fade}
    elevation={0}
    anchorOrigin={{vertical: 0, horizontal: 0,}}
    transformOrigin={{vertical: -40, horizontal: 0}}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 3,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      zIndex: 1,
      padding: '0',
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

const FilterByEmployee = ({jobs, fun }: { jobs: TJobRDO[]; fun: (text: string | null) => void}) => {
  const { visibility, toggle, hide } = useVisibility();
  const ref = useRef<HTMLButtonElement>(null);
  const employees = useAppSelector(getEmployees);


  const hundleSelectEmployee = useCallback((evt: React.MouseEvent<HTMLLIElement>) => {
    const familyMap = new Map();
    jobs && jobs.map((job) => familyMap.set(job.employee.familyName, job.employee.familyName));
    const family = evt.currentTarget.textContent;
    if (!familyMap.get(family)) {
      fun(null); 
      toggle(); 
        toast.info(`${family} – not found in the list`, {
          position: 'top-center',
          style: {
              background: '#e4ba48',
          },
        });
      return;
    }

    fun(family);
    toggle();
  }, [fun, toggle, jobs])

  const hundleResetEmployee = useCallback(() => {
    fun(null);
    toggle();
  }, [fun, toggle])

  return (
    <>
      <IconButton 
        style={{opacity: "1", color: "#96c8cc"}} sx={{m: 0, zIndex: 5}} 
        ref={ref} onClick={toggle} id="fade-button" varia-controls={visibility ? 'fade-menu' : undefined}>
        <DragIndicatorIcon/>
      </IconButton>
      <StyledMenu
        open={visibility}
        onClose={hide}
        anchorEl={ref.current}
        sx={{zIndex: 8, borderRadius: 0, }}
      >
        <MenuItem sx={{p: 1, borderBottom: 1, justifyContent: "center", borderBottomColor: "rgba(0, 0, 0, 0.1)", color: '#96b8cc', textTransform: 'uppercase', fontSize: 13}} onClick={hundleResetEmployee}>
            reset
        </MenuItem>
        {employees && employees.map((employee) => (
          <MenuItem key={employee.familyName} sx={{p: 1, borderBottom: 1, borderBottomColor: "rgba(0, 0, 0, 0.1)",  fontSize: 14}} onClick={hundleSelectEmployee}>
            {employee.familyName}
          </MenuItem>
        ))}

      </StyledMenu>
    </>
  );
};

export default FilterByEmployee;
