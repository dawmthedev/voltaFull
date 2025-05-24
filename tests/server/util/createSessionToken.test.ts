import jwt from 'jsonwebtoken';

describe('createSessionToken', () => {
  const OLD_ENV = process.env;

  afterEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  it('returns signed JWT with expected payload', () => {
    process.env.ENCRYPTION_KEY = 'secret';
    const { createSessionToken } = require('../../../server/src/util');
    const token = createSessionToken({ id: '123', email: 'a@test.com', role: 'admin' });
    const decoded = jwt.decode(token) as any;
    expect(decoded).toEqual(expect.objectContaining({ id: '123', email: 'a@test.com', role: 'admin' }));
  });

  it('throws error when ENCRYPTION_KEY is missing', () => {
    delete process.env.ENCRYPTION_KEY;
    const { createSessionToken } = require('../../../server/src/util');
    expect(() => createSessionToken({ id: '1', email: 'b@test.com', role: 'admin' })).toThrow('ENCRYPTION_KEY not set');
  });
});
