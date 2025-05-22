import axios from 'axios';

jest.mock('axios');

// path to the module under test
const modulePath = '../../../../client/src/libs/client/apiClient';

describe('apiClient', () => {
  beforeEach(() => {
    jest.resetModules();
    (axios.create as jest.Mock).mockClear();
    delete (global as any).localStorage;
  });

  it('configures axios with the correct baseURL', () => {
    const mockInstance = { interceptors: { request: { use: jest.fn() } } } as any;
    (axios.create as jest.Mock).mockReturnValue(mockInstance);
    const { baseURL } = require(modulePath);
    const { default: client } = require(modulePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL,
      timeout: 30000,
      withCredentials: true,
    });
    expect(client).toBe(mockInstance);
  });

  it('adds Authorization header from localStorage', () => {
    const use = jest.fn();
    (axios.create as jest.Mock).mockReturnValue({
      interceptors: { request: { use } },
    } as any);

    (global as any).localStorage = {
      getItem: jest.fn(() => 'token123'),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };

    require(modulePath);

    expect(use).toHaveBeenCalled();
    const interceptor = use.mock.calls[0][0];
    const config: any = { headers: {} };
    interceptor(config);
    expect(config.headers.Authorization).toBe('token123');
  });
});
