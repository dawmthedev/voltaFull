import { render, screen, fireEvent } from '@testing-library/react';
import AddLead from '../../../../client/src/components/add-lead/AddLead';

const sampleLeadValue = [
  { name: 'First Name', type: 'text', value: '' },
];

describe('AddLead component', () => {
  it('invokes callback on input change', () => {
    const getAddLeadData = jest.fn();
    render(<AddLead leadValue={sampleLeadValue} getAddLeadData={getAddLeadData} />);
    const input = screen.getByLabelText('First Name');
    fireEvent.change(input, { target: { value: 'John' } });
    expect(getAddLeadData).toHaveBeenCalledWith('John', 'First Name', 0);
  });
});
