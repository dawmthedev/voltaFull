import { render, screen } from '@testing-library/react'
import Navbar from '../../../../client/src/components/Navbar'
import { Provider } from '../../../../client/src/components/ui/provider'

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
  })
})
