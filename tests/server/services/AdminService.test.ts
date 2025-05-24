import { AdminService } from '../../../server/src/services/AdminService';
import { Forbidden } from '@tsed/exceptions';
import { createSessionToken } from '../../../server/src/util';

jest.mock('../../../server/src/util', () => ({
  __esModule: true,
  createPasswordHash: jest.fn(),
  createSessionToken: jest.fn(),
  generateRandomId: jest.fn()
}));

describe('AdminService', () => {
  let adminModel: any;
  let verifyModel: any;
  let orgModel: any;
  let service: AdminService;

  beforeEach(() => {
    process.env.ENCRYPTION_KEY = 'secret';
    (createSessionToken as jest.Mock).mockReset();
    adminModel = {
      findById: jest.fn()
    };
    verifyModel = {
      findOne: jest.fn(),
      create: jest.fn(),
      updateOne: jest.fn()
    };
    orgModel = {};
    service = new AdminService(orgModel as any, adminModel as any, verifyModel as any);
  });

  describe('createSessionCookie', () => {
    const admin = { _id: '1', email: 'e@test.com', role: 'manager' } as any;

    it('creates a new session token when none exists', async () => {
      verifyModel.findOne.mockResolvedValue(null);
      (createSessionToken as jest.Mock).mockReturnValue('token123');

      const token = await service.createSessionCookie(admin);

      expect(createSessionToken).toHaveBeenCalledWith({
        id: admin._id,
        email: admin.email,
        role: admin.role
      });
      expect(verifyModel.create).toHaveBeenCalledWith(
        expect.objectContaining({ token: 'token123', adminId: admin._id })
      );
      expect(token).toBe('token123');
    });

    it('reuses existing session token when found', async () => {
      verifyModel.findOne.mockResolvedValue({ token: 'existing' });

      const token = await service.createSessionCookie(admin);

      expect(createSessionToken).not.toHaveBeenCalled();
      expect(verifyModel.updateOne).toHaveBeenCalledWith(
        { adminId: admin._id },
        expect.objectContaining({ token: 'existing' })
      );
      expect(token).toBe('existing');
    });
  });

  describe('getActiveAdmin', () => {
    it('returns admin for a valid token', async () => {
      const admin = { _id: '1' } as any;
      verifyModel.findOne.mockResolvedValue({ adminId: '1' });
      adminModel.findById.mockResolvedValue(admin);

      const result = await service.getActiveAdmin('token');

      expect(result).toBe(admin);
    });

    it('throws when token is invalid', async () => {
      verifyModel.findOne.mockResolvedValue(null);

      await expect(service.getActiveAdmin('bad')).rejects.toEqual(
        expect.objectContaining({ message: 'INVALID_TOKEN' })
      );
    });

    it('throws when admin not found', async () => {
      verifyModel.findOne.mockResolvedValue({ adminId: '2' });
      adminModel.findById.mockResolvedValue(null);

      await expect(service.getActiveAdmin('token')).rejects.toEqual(
        expect.objectContaining({ message: 'ADMIN_NOT_FOUND' })
      );
    });
  });
});
