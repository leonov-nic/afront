import { memo, useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { CustomButton } from '../common/button/button';
import { getDayAndMonth } from '../../utils/utils';
import useQueryStoreOperations from '../../hooks/useQueryStoreOperations';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteStoreHouseOperation, fetchStoreHouseOperation } from '../../store/api-action';
import { getStoreHouseOperations, getTotalCountOfStoreHouseOperations, getIsLoading } from '../../store/stotrehouse-process/storehouse-process';

const MainTableStorage = memo((): JSX.Element => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getIsLoading);
  const storehouseOperations = useAppSelector(getStoreHouseOperations);
  const totalCountOfStoreHouseOperations = useAppSelector(getTotalCountOfStoreHouseOperations);
  const { query, setQuery } = useQueryStoreOperations();

  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  
const hundleDeleteRow = () => {
    selectedRow && dispatch(deleteStoreHouseOperation(selectedRow))
    .then((data) => { 
      if (data.meta.requestStatus === 'rejected') {
        // toast.error(`You must delete all operation Shipment for position ${(row.product.name)} after ${humanizeDate(row.createdAt)}`, {
        toast.error(`You must delete all operation Shipment  after `, {
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

    // toast.info(`Operation for ${row.typeOperation} for ${humanizeDate(row.createdAt)} deleted`, {
    toast.info(`Operation deleted`, {
      position: 'top-center',
      style: {
        background: '#e4ba48',
      }, autoClose: 2000,
    });
  }

  useEffect(() => {

  }, [storehouseOperations, query]);

  const columns: GridColDef<(typeof storehouseOperations)[number]>[] = [
    {
      field: 'typeOperation',
      headerName: 'Operation',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: 'employee.registrationNumber',
      headerName: 'N',
      width: 70,
      valueGetter: (_value, row) => `${row.employee?.registrationNumber || '-'}`,
      hideSortIcons: true,
      filterable: false,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: 'familyName',
      headerName: 'Employee',
      flex: 1,
      align: 'left',
      valueGetter: (_value, row) => `${row.employee?.familyName || '-'}`,
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 80,
      valueGetter: (_value, row) => `${getDayAndMonth(row.createdAt)}`,
    },
    {
      field: 'product.name',
      headerName: 'Position',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (_value, row) => `${row.product.name} ${row.product.size ? row.product.size : row.product.diameter}`,
    }, 
    {
      field: 'totalAmount',
      headerName: 'Quantity',
      headerAlign: 'center',
      align: 'center',
      type: 'number',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: 'currentQuantityProduct',
      headerName: 'Available',
      headerAlign: 'center',
      align: 'center',
      type: 'number',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: 'fromWhom',
      headerName: 'From Whom',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (_value, row) => `${row.fromWhom || '-'}`,
    }, 
    {
      field: 'comment',
      headerName: 'Comment',
      type: 'string',
      flex: 1,
      headerAlign: 'right',
      align: 'right',
      valueGetter: (_value, row) => `${row.comment || '-'}`,
      disableColumnMenu: true,
      sortable: false,
    }, 
  ];
  
  return (
    <Box 
      sx={{ 
        minHeight: 645, width: '100%',  minWidth: '735px', position: 'relative',
        "& .MuiDataGrid-columnHeader": {color: '#93a9b8'},
        "& .MuiTablePagination-displayedRows": {
          fontSize: '15px', fontWeight: 'bold', color: '#17c1bc'
        },
        "& .MuiTablePagination-toolbar": {
          background: 'white'
        }, 
        "& div.css-de9k3v-MuiDataGrid-selectedRowCount": {
          color: '#e74c3c', fontWeight: 'bold'
        },

      }}>
      <DataGrid
        style={{ width: '100%' }}
        rows={storehouseOperations}
        getRowId={(row) => row._id}
        columns={columns}
        paginationMode="server"
        rowCount={totalCountOfStoreHouseOperations }
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        onPaginationModelChange={(model) => {
          const page = model.page + 1;
          setQuery && setQuery({...query, page});
          // setPageSize(model.pageSize);
        }}

        disableMultipleRowSelection={true}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(row) => setSelectedRow(row[0] as string | null)}
        // density='comfortable'0
        loading={isLoading}
      />
      
      {selectedRow && (
        <CustomButton
          data-name="storage"
          sx={{
            backgroundColor: "#e74c3c",
            boxShadow: "none",
            px: 4,
            py: 1.75,
            minWidth: "57px",
            mx: 1,
            position: 'absolute',
            left: '12%',
            bottom: 0

          }}
          onClick={hundleDeleteRow}
        >
          delete row
        </CustomButton>
      )}
    </Box>
  );
});


export default MainTableStorage;
