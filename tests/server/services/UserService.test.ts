import { UserService } from '../../../server/src/services/UserService';
import { Unauthorized } from '@tsed/exceptions';
import { ADMIN } from '../../../server/src/util/constants';

describe('UserService', () => {
  let userModel: any;
  let service: UserService;
  let sortMock: jest.Mock;

  beforeEach(() => {
    sortMock = jest.fn();
    userModel = {
      find: jest.fn().mockReturnValue({ sort: sortMock })
    } as any;
    // cast as any for constructor
    service = new UserService(userModel as any);
  });

  it('throws when user is missing', async () => {
    await expect(service.findAll(undefined as any)).rejects.toBeInstanceOf(Unauthorized);
  });

  it('throws when user is not admin', async () => {
    const payload = { id: '1', email: 'a@test.com', role: 'User' } as any;
    await expect(service.findAll(payload)).rejects.toBeInstanceOf(Unauthorized);
  });

  it('returns users when admin', async () => {
    const users = [{ id: '1', name: 'Alice' }];
    sortMock.mockResolvedValue(users);
    const payload = { id: '1', email: 'a@test.com', role: ADMIN } as any;
    const result = await service.findAll(payload);
    expect(userModel.find).toHaveBeenCalled();
    expect(sortMock).toHaveBeenCalledWith({ createdAt: -1 });
    expect(result).toBe(users);
  });
});
