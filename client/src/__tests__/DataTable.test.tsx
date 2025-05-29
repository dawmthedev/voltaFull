import React from 'react';
import { render, screen } from '@testing-library/react';
import DataTable from '../components/DataTable';
import { Provider } from '../components/ui/provider';

const columns = [
  { header: 'Name', accessor: 'name' },
  { header: 'Age', accessor: 'age', isNumeric: true },
];

const data = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
];

test('renders data rows', () => {
  render(
    <Provider>
      <DataTable columns={columns} data={data} />
    </Provider>
  );

  expect(screen.getByText('John')).toBeInTheDocument();
  expect(screen.getByText('30')).toBeInTheDocument();
});
