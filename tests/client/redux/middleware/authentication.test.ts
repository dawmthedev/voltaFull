import { login, register } from '../../../../client/src/redux/middleware/authentication';
import { post } from '../../../../client/src/libs/client/apiClient';

jest.mock('../../../../client/src/libs/client/apiClient', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  destroy: jest.fn(),
  __esModule: true,
  default: {}
}));

describe('authentication middleware', () => {
  const dispatch = jest.fn();
  const getState = () => ({}) as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('login posts credentials to /auth/login', async () => {
    (post as jest.Mock).mockResolvedValue({ data: { data: { token: 'abc' } } });
    const result = await login({ email: 'a@test.com', password: 'pass' })(dispatch, getState, undefined);
    expect(post).toHaveBeenCalledWith('/auth/login', { email: 'a@test.com', password: 'pass' });
    expect(result.payload).toEqual({ token: 'abc' });
  });

  it('login propagates error message', async () => {
    (post as jest.Mock).mockRejectedValue({ response: { data: { message: 'bad' } } });
    await expect(login({ email: 'a@test.com', password: 'pass' })(dispatch, getState, undefined)).rejects.toThrow('bad');
  });

  it('register posts data to /auth/register', async () => {
    (post as jest.Mock).mockResolvedValue({ data: { data: 'ok' } });
    const result = await register({ name: 'John', email: 'john@test.com', password: 'secret' })(dispatch, getState, undefined);
    expect(post).toHaveBeenCalledWith('/auth/register', { name: 'John', email: 'john@test.com', password: 'secret' });
    expect(result.payload).toEqual('ok');
  });

  it('register propagates error message', async () => {
    (post as jest.Mock).mockRejectedValue({ response: { data: { message: 'exists' } } });
    await expect(register({ name: 'John', email: 'john@test.com', password: 'secret' })(dispatch, getState, undefined)).rejects.toThrow('exists');
  });
});
