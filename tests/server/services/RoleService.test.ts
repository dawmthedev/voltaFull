import { RoleService } from '../../../server/src/services/RoleService';

describe('RoleService', () => {
  let roleModel: any;
  let service: RoleService;

  beforeEach(() => {
    roleModel = {
      find: jest.fn(),
      create: jest.fn(),
      findByIdAndUpdate: jest.fn()
    };
    // cast as any to satisfy constructor
    service = new RoleService(roleModel as any);
  });

  describe('findRoles', () => {
    it('returns all roles from the model', async () => {
      const roles = [{ name: 'admin' }, { name: 'user' }];
      roleModel.find.mockResolvedValue(roles);

      const result = await service.findRoles();

      expect(roleModel.find).toHaveBeenCalled();
      expect(result).toBe(roles);
    });
  });

  describe('createRole', () => {
    it('passes the role data to the model', async () => {
      const payload = { name: 'manager' };
      const created = { _id: '1', name: 'manager' };
      roleModel.create.mockResolvedValue(created);

      const result = await service.createRole(payload);

      expect(roleModel.create).toHaveBeenCalledWith({ name: payload.name });
      expect(result).toBe(created);
    });
  });

  describe('updateRole', () => {
    it('updates the role by id', async () => {
      const payload = { _id: '1', name: 'salesrep' };
      const updated = { _id: '1', name: 'salesrep' };
      roleModel.findByIdAndUpdate.mockResolvedValue(updated);

      const result = await service.updateRole(payload);

      expect(roleModel.findByIdAndUpdate).toHaveBeenCalledWith(payload._id, { name: payload.name });
      expect(result).toBe(updated);
    });
  });
});
