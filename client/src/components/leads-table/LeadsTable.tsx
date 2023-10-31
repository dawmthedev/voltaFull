import React, { ChangeEvent, MouseEvent } from 'react';
import { Avatar, Card, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
import { Stack } from '@mui/system';
import Scrollbar from '../scrollbar';

interface LeadsTableProps {
  data: any;
  order: string;
  orderBy: string;
  headLabel: {
    name: string;
    type?: string;
    alignRight?: boolean;
  }[];
  rowCount: number;
  selected: Array<string>;
  emptyRows: number;
  isNotFound?: boolean;
  filterName?: string;
  onRequestSort: (event: MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClick: (event: ChangeEvent<HTMLInputElement>, name: string) => void;
}

const LeadsTable = ({
  data,
  order,
  orderBy,
  rowCount,
  selected,
  emptyRows,
  headLabel,
  isNotFound,
  filterName,
  onRequestSort,
  onSelectAllClick,
  handleClick
}: LeadsTableProps) => {
  return (
    <Card sx={{ mt: 2 }}>
      <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={() => {}} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 700, mt: '1rem' }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={headLabel}
              rowCount={rowCount}
              numSelected={selected.length}
              onRequestSort={onRequestSort}
              onSelectAllClick={onSelectAllClick}
            />
            <TableBody>
              {(data &&
                data.length &&
                data.map((lead, index) => {
                  const selectedUser = selected.indexOf(filterName) !== -1;

                  return (
                    <TableRow hover key={lead._id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                      <TableCell padding="checkbox">
                        <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, lead._id)} />
                      </TableCell>

                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={lead?._id} src={`/assets/images/avatars/avatar_${index + 1}.jpg`} />
                          <Typography variant="subtitle2" noWrap>
                            {lead?.[headLabel?.[0]?.name]}
                          </Typography>
                        </Stack>
                      </TableCell>
                      {headLabel?.slice(1, headLabel.length).map((label, index) => {
                        return (
                          <TableCell key={index} align={label.alignRight ? 'right' : 'left'}>
                            {lead?.[label.name]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })) ||
                ''}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            {isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <Paper
                      sx={{
                        textAlign: 'center'
                      }}
                    >
                      <Typography variant="h6" paragraph>
                        Not found
                      </Typography>

                      <Typography variant="body2">
                        No results found for &nbsp;
                        <strong>&quot;{filterName}&quot;</strong>.
                        <br /> Try checking for typos or using complete words.
                      </Typography>
                    </Paper>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
};

export default LeadsTable;
