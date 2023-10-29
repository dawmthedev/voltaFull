import React, { ChangeEvent, MouseEvent, memo } from 'react';
import { Avatar, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { UserListHead } from '../../sections/@dashboard/user';
import { LeadsTypes } from '../../types';
import { Stack } from '@mui/system';

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
          {data?.map((lead, index) => {
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
          })}
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
  );
};

export default LeadsTable;
