import { UserService } from '../../../server/src/services/UserService';

describe('UserService', () => {
  let userModel: any;
  let service: UserService;

  beforeEach(() => {
    userModel = {
      find: jest.fn().mockReturnValue({ sort: jest.fn().mockReturnValue({ skip: jest.fn().mockReturnValue({ limit: jest.fn().mockResolvedValue([]) }) }) }),
      countDocuments: jest.fn().mockResolvedValue(0),
      findByIdAndUpdate: jest.fn()
    } as any;
    service = new UserService(userModel as any);
  });

  it('fetches paged users', async () => {
    await service.findAll(1, 10);
    expect(userModel.find).toHaveBeenCalled();
  });

  it('updates user role', async () => {
    userModel.findByIdAndUpdate.mockResolvedValue({});
    await service.updateRole('1', 'Technician');
    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith('1', { role: 'Technician' }, { new: true });
  });
});
