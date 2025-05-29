import React from 'react'
import { render, screen } from '@testing-library/react'
import Navbar from '../components/Navbar'
import { Provider } from '../components/ui/provider'

it('renders sidebar toggle button', () => {
  render(
    <Provider>
      <Navbar onToggleSidebar={() => {}} toggleRef={React.createRef()} />
    </Provider>
  )
  expect(screen.getByRole('button', { name: /toggle sidebar/i })).toBeInTheDocument()
})
