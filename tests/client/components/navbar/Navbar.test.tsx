import { render, screen } from '@testing-library/react'
import Navbar from '../../../../client/src/components/Navbar'
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

describe('Navbar', () => {
  it('shows brand and action buttons', () => {
    render(
      <Provider>
        <Navbar onLogout={() => {}} onCSVChange={() => {}} onAddProject={() => {}} />
      </Provider>
    )
    expect(screen.getByText(/Volta CRM/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /upload csv/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add project/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /test user/i })).toBeInTheDocument()
    expect(screen.getByText(/Test User/i)).toBeInTheDocument()
    expect(screen.getByText(/Admin/i)).toBeInTheDocument()
  })
})
