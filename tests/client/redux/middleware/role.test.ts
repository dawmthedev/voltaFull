import { getRoles, createRole } from '../../../../client/src/redux/middleware/role';
import { setAlert } from '../../../../client/src/redux/slice/alertSlice';
import { get, post } from '../../../../client/src/libs/client/apiClient';

jest.mock('../../../../client/src/libs/client/apiClient', () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    destroy: jest.fn(),
    __esModule: true,
    default: {}
  };
});

describe('role middleware', () => {
  const dispatch = jest.fn();
  const getState = () => ({}) as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getRoles hits /role with signal', async () => {
    (get as jest.Mock).mockResolvedValue({ data: { data: ['r1'] } });
    const signal = new AbortController().signal;
    const thunk = getRoles({ signal });
    const result = await thunk(dispatch, getState, undefined);
    expect(get).toHaveBeenCalledWith('/role', { signal });
    expect(result.payload).toEqual(['r1']);
  });

  it('getRoles dispatches alert on error', async () => {
    (get as jest.Mock).mockRejectedValue({ response: { data: { message: 'err' } } });
    const signal = new AbortController().signal;
    await expect(getRoles({ signal })(dispatch, getState, undefined)).rejects.toBeDefined();
    expect(dispatch).toHaveBeenCalledWith(setAlert({ message: 'err', type: 'error' }));
  });

  it('createRole posts to /role and alerts success', async () => {
    (post as jest.Mock).mockResolvedValue({ data: { data: { id: 1 } } });
    const thunk = createRole({ role: 'Admin' });
    const result = await thunk(dispatch, getState, undefined);
    expect(post).toHaveBeenCalledWith('/role', { name: 'Admin' });
    expect(dispatch).toHaveBeenCalledWith(setAlert({ message: 'Role created successfully', type: 'success' }));
    expect(result.payload).toEqual({ id: 1 });
  });

  it('createRole dispatches alert on error', async () => {
    (post as jest.Mock).mockRejectedValue({ response: { data: { message: 'fail' } } });
    await expect(createRole({ role: 'Admin' })(dispatch, getState, undefined)).rejects.toBeDefined();
    expect(dispatch).toHaveBeenCalledWith(setAlert({ message: 'fail', type: 'error' }));
  });
});
