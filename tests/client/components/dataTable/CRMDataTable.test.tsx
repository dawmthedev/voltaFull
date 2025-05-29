import { render, screen, fireEvent } from '@testing-library/react'
import CRMDataTable, { CRMUserRecord } from '../../../../client/src/components/CRMDataTable'

const users: CRMUserRecord[] = [
  { name: 'Alice', email: 'alice@example.com', role: 'Admin', phone: '111' },
  { name: 'Bob', email: 'bob@example.com', role: 'User', phone: '222' },
  { name: 'Charlie', email: 'charlie@example.com', role: 'User', phone: '333' },
]

describe('CRMDataTable', () => {
  it('filters rows based on search input', () => {
    render(<CRMDataTable data={users} />)
    const input = screen.getByPlaceholderText(/search/i)
    fireEvent.change(input, { target: { value: 'bob' } })
    expect(screen.queryByText('Alice')).not.toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
  })
})
