import logger, { emoji } from '../logger';

describe('logger', () => {
  it('prints success with emoji', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    logger.success('ok');
    expect(spy).toHaveBeenCalledWith(emoji.success, 'ok');
    spy.mockRestore();
  });

  it('prints error in red', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    logger.error(new Error('fail'));
    expect(spy.mock.calls[0][0]).toBe(emoji.error);
    expect(spy.mock.calls[0][1]).toContain('\x1b[31mfail\x1b[0m');
    spy.mockRestore();
  });
});
