import { VerificationService } from '../../../server/src/services/VerificationService';
import { encrypt } from '../../../server/src/util/crypto';

jest.mock('../../../server/src/util/crypto', () => ({
  __esModule: true,
  encrypt: jest.fn(),
  decrypt: jest.fn()
}));

describe('VerificationService', () => {
  let verificationModel: any;
  let service: VerificationService;

  beforeEach(() => {
    process.env.ENCRYPTION_KEY = 'secret';
    verificationModel = {
      findOne: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findById: jest.fn(),
      create: jest.fn()
    };
    service = new VerificationService(verificationModel as any);
    (encrypt as jest.Mock).mockReset();
  });

  describe('generateToken', () => {
    it('encrypts the provided id', () => {
      (encrypt as jest.Mock).mockReturnValue('encrypted');
      const token = service.generateToken('id1');
      expect(encrypt).toHaveBeenCalledWith('id1');
      expect(token).toBe('encrypted');
    });
  });

  describe('verifyCode', () => {
    it('verifies code and updates status', async () => {
      const ver = { id: 'v1', email: 'a@test.com', code: '123' } as any;
      jest.spyOn(service, 'findVerificationByEmail').mockResolvedValue(ver);
      const addSpy = jest.spyOn(service, 'addExpiryTime').mockResolvedValue(null as any);
      const updateSpy = jest
        .spyOn(service, 'updateVerificationStatus')
        .mockResolvedValue('updated' as any);

      const result = await service.verifyCode({ email: ver.email, code: '123' });

      expect(addSpy).toHaveBeenCalledWith(ver.id);
      expect(updateSpy).toHaveBeenCalledWith({ id: ver.id, status: true });
      expect(result).toBe('updated');
    });

    it('throws when code or email is incorrect', async () => {
      jest.spyOn(service, 'findVerificationByEmail').mockResolvedValue(null as any);
      await expect(
        service.verifyCode({ email: 'bad@test.com', code: '1' })
      ).rejects.toEqual(expect.objectContaining({ message: 'INCORRECT_CODE_OR_EMAIL' }));
    });
  });

  describe('verifyToken', () => {
    it('returns record for valid token and email', async () => {
      const record = { email: 'x@test.com', code: 'tok' } as any;
      verificationModel.findOne.mockResolvedValue(record);

      const result = await service.verifyToken({ verificationToken: 'tok', email: 'x@test.com' });

      expect(verificationModel.findOne).toHaveBeenCalledWith({ code: 'tok', verified: false });
      expect(result).toBe(record);
    });

    it('throws when token not found', async () => {
      verificationModel.findOne.mockResolvedValue(null);
      await expect(
        service.verifyToken({ verificationToken: 'bad' })
      ).rejects.toEqual(expect.objectContaining({ message: 'EMAIL_NOT_VERIFIED' }));
    });

    it('throws when email does not match', async () => {
      verificationModel.findOne.mockResolvedValue({ email: 'a@b.com', code: 'tok' });
      await expect(
        service.verifyToken({ verificationToken: 'tok', email: 'wrong@test.com' })
      ).rejects.toEqual(expect.objectContaining({ message: 'EMAIL_NOT_VERIFIED' }));
    });
  });
});
