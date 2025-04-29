import { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getStatisticsOperation } from '../../store/api-action';
import { StatisticsOfOperations } from '../../types';
import { getStoreHouseOperations } from '../../store/stotrehouse-process/storehouse-process';

export interface DrawerEditJobProps {
  open: boolean;
  onClose: () => void;
}

export default function DrawerStatistics(props: DrawerEditJobProps): JSX.Element {
  const {open, onClose} = props;
  const [stat, setStat] = useState<StatisticsOfOperations[]>([]);
  const dispatch = useAppDispatch();
  const storeHouseOperations = useAppSelector(getStoreHouseOperations);

  useEffect(() => {
    dispatch(getStatisticsOperation())
    .then(({payload}) => Array.isArray(payload) && setStat(payload))
    .catch((error) => console.log(error))
  }, [dispatch, storeHouseOperations]);

  const hundlerCloseDialog = () => {
    onClose();
  }

  return (
    <Drawer 
      onClose={onClose} 
      open={open} 
      anchor="right" 
      sx={{zIndex: 10, background: 'transparent', ".MuiPaper-elevation": {backgroundColor: '#544f69', minWidth: '40%'}}}
    >
      <Stack 
        direction="row" 
        spacing={1}
        flexWrap="wrap" alignItems="center" 
      >
        <Stack padding={1} sx={{width: '100%', }}>
          <IconButton aria-label="close" color="inherit" size="large" 
            sx={{backgroundColor: 'rgba(40, 40, 40, 0.1)', width: 'fit-content', ml: 'auto'}} 
            onClick={hundlerCloseDialog}
          >
            <Close sx={{color: 'white'}} />
          </IconButton>
        </Stack>

        <List 
          sx={{
            color: 'white', px: 10,
            textAlign: 'left',
            width: '100%',
            fontSize: '18px',
            overflowY: 'auto'
          }} >
          {stat.map((item) => (
            <ListItem 
              key={item.employeeName} 
              disablePadding
              sx={{
                width: '100%', display: 'grid', gridTemplateColumns: '10em 1fr',
                alignItems: 'start', alignContent: 'start', borderBottom: '1px solid rgb(107, 90, 130)'
              }}
              
            >
              <Stack direction="column" alignItems="top" padding={2}>{item.employeeName}</Stack>
              <Stack  direction="column" alignItems="top" padding={2}>
                {item.products.map((item, index) => {
                  return (
                    <Stack 
                      key={index}   
                      direction="row"
                      alignItems="top"
                      sx={{mb: 2}}
                    >
                      {`${item.productName }: ${item.totalAmount} `}
                    </Stack>
                  )})}
              </Stack>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Drawer>
  );
}
