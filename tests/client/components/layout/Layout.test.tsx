import { render } from '@testing-library/react';
import Layout from '../../../../client/src/components/Layout';
import { Provider } from '../../../../client/src/components/ui/provider';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

describe('Layout', () => {
  it('renders container with vertical scroll classes', () => {
    const { container } = render(
      <Provider>
        <MemoryRouter initialEntries={["/dashboard"]}>
          <Routes>
            <Route path="/dashboard" element={<Layout />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const scrollDiv = container.querySelector('div.overflow-y-auto');
    expect(scrollDiv).toBeInTheDocument();
  });
});
