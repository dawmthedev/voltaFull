import { Button } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import LeadsTable from '../components/leads-table/LeadsTable';
import CustomModal from '../components/modals/CustomModal';
import CsvUpload from '../components/upload-file/CsvUpload';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getCategories } from '../redux/middleware/category';
import { createBulkLead, createLead, getLeads } from '../redux/middleware/lead';
import { categorySelector } from '../redux/slice/categorySlice';
import { leadState, openModal } from '../redux/slice/leadSlice';
import { CategoryResponseTypes } from '../types';
import createAbortController from '../utils/createAbortController';

const DynamicLead = () => {
  const categories: CategoryResponseTypes[] = useAppSelector(categorySelector);
  const { data, isModalOpen } = useAppSelector(leadState);
  const dispatch = useAppDispatch();
  const { signal, abort } = createAbortController();

  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [uploadedLeads, setUploadedLeads] = useState([]);
  const [uploadedLeadsCols, setUploadedLeadsCols] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id);

  console.log('data-------------------------', data);

  const [dataFormat, setDataFormat] = useState({
    tableName: 'SupperStore',
    columns: [
      {
        name: 'firstName',
        type: 'String'
      },
      {
        name: 'lastName',
        type: 'String'
      },
      {
        name: 'email',
        type: 'String'
      },
      {
        name: 'phone',
        type: 'String'
      },
      {
        name: 'createdDate',
        type: 'Date'
      },
      {
        name: 'updatedDate',
        type: 'Date'
      }
    ],
    data: {
      firstName: 'Ali',
      lastName: 'Raza',
      email: 'raza@gmail.com',
      phone: '12345678901'
    }
  });

  useEffect(() => {
    ((async) => {
      dispatch(getCategories({ signal }));
    })();
    return () => {
      abort();
    };
  }, []);

  useEffect(() => {
    if (!categories.length) return;
    ((async) => {
      dispatch(getLeads({ categoryId: categories[0].id, signal }));
    })();
    return () => {
      abort();
    };
  }, [categories]);

  const handleCsvData = (csvData) => {
    setUploadedLeads(csvData);
    // get columns from csv data
    setUploadedLeadsCols(getColumns(csvData));
  };

  const submitBulkLeads = () => {
    const leadsFormattedData = {
      tableName: 'dynamicleadtests',
      columns: getColumns(uploadedLeads),
      data: uploadedLeads
    };
    dispatch(createBulkLead({ leads: leadsFormattedData, signal }));
  };

  const getColumns = useCallback((data: any) => {
    const columns = [];
    const keys = Object.keys(data[0]);
    keys.forEach((key) => {
      columns.push({
        name: key,
        type: 'string'
      });
    });
    return columns;
  }, []);

  const handleRequestSort = (event, property) => {
    // const isAsc = orderBy === property && order === 'asc';
    // setOrder(isAsc ? 'desc' : 'asc');
    // setOrderBy(property);
  };

  return (
    <Fragment>
      <Helmet>
        <title> Dynamic Leads | Minimal UI </title>
      </Helmet>
      <Box>
        <h1>Dynamic Lead</h1>

        <Stack direction="row" alignItems="center" gap={2} mb={5} overflow="scroll" width={'90%'}>
          {(categories &&
            categories.map((category: CategoryResponseTypes) => (
              <Button
                key={category.name}
                variant="outlined"
                sx={{ minWidth: 'auto' }}
                onClick={() => {
                  dispatch(getLeads({ categoryId: category.id, signal }));
                }}
              >
                {category.name}
              </Button>
            ))) ||
            ''}
        </Stack>
        <Button onClick={() => dispatch(openModal(true))}>Add New Leads</Button>
        <Box>
          <CustomModal
            title="Upload Lead CSV"
            open={isModalOpen}
            setOpen={() => dispatch(openModal(false))}
            handleSubmit={submitBulkLeads}
            size="lg"
          >
            <CsvUpload handleCsvData={handleCsvData} />
            {uploadedLeads.length && (
              <LeadsTable
                data={uploadedLeads}
                headLabel={getColumns(uploadedLeads)}
                order="asc"
                orderBy={dataFormat.columns[0].name}
                rowCount={10}
                selected={selected}
                emptyRows={0}
                isNotFound={false}
                filterName={filterName}
                onRequestSort={() => {}}
                onSelectAllClick={() => {}}
                handleClick={() => {}}
              />
            )}
          </CustomModal>
        </Box>
        {(data && data.length && (
          <Box>
            <LeadsTable
              data={data}
              headLabel={getColumns(data)}
              order="asc"
              orderBy={dataFormat.columns[0].name}
              rowCount={10}
              selected={selected}
              emptyRows={0}
              isNotFound={false}
              filterName={filterName}
              onRequestSort={() => {}}
              onSelectAllClick={() => {}}
              handleClick={() => {}}
            />
          </Box>
        )) ||
          ''}
      </Box>
    </Fragment>
  );
};

export default DynamicLead;
