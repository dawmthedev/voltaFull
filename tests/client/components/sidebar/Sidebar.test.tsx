import { render, screen } from '@testing-library/react'
import Sidebar from '../../../../client/src/components/Sidebar'
import { Provider } from '../../../../client/src/components/ui/provider'
import { store } from '../../../../client/src/store'
import { login, logout } from '../../../../client/src/store/authSlice'

beforeEach(() => {
  store.dispatch(
    login.fulfilled(
      { user: { name: 'Test User', email: 't@test.com', role: 'Admin' }, token: 't' },
      '',
      { email: '', password: '' }
    )
  )
})

afterEach(() => {
  store.dispatch(logout())
})

describe('Sidebar', () => {
  it('shows navigation links', () => {
    render(
      <Provider>
        <Sidebar />
      </Provider>
    )
    expect(screen.getByText(/Projects/i)).toBeInTheDocument()
    expect(screen.getByText(/Accounts Payable/i)).toBeInTheDocument()
    expect(screen.getByText(/Users/i)).toBeInTheDocument()
  })
})
