import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../../../client/src/App'
import { Provider } from '../../../client/src/components/ui/provider'

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: { token: 't', id: 1 } })
    } as any)
  )
})

afterEach(() => {
  ;(global.fetch as jest.Mock).mockRestore()
  localStorage.clear()
})

test('login flow and deals list', async () => {
  ;(global.fetch as jest.Mock)
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: { token: 't', id: 1 } })
    })
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: [{ id: '1', name: 'D1' }] })
    })

  render(
    <MemoryRouter initialEntries={["/login"]}>
      <Provider>
        <App />
      </Provider>
    </MemoryRouter>
  )

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@test.com' } })
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass' } })
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

  await waitFor(() => {
    expect(screen.getByText('D1')).toBeInTheDocument()
  })
})
