import { AccountsPayableService } from '../../../server/src/services/AccountsPayableService';

describe('AccountsPayableService', () => {
  let payableModel: any;
  let projectModel: any;
  let service: AccountsPayableService;

  beforeEach(() => {
    payableModel = {
      findOneAndUpdate: jest.fn(),
      find: jest.fn(),
      findByIdAndUpdate: jest.fn()
    } as any;
    projectModel = {
      findById: jest.fn()
    } as any;
    service = new AccountsPayableService(payableModel, projectModel);
  });

  it('validates allocation percentages', async () => {
    await expect(
      service.upsertAllocations('p1', [
        { technicianId: 't1', percentage: 60 },
        { technicianId: 't2', percentage: 50 }
      ])
    ).rejects.toThrow('Total allocation percentage cannot exceed 100');
  });

  it('upserts allocations with computed amount', async () => {
    projectModel.findById.mockResolvedValue({ contractAmount: 1000 });
    payableModel.findOneAndUpdate.mockResolvedValue({});

    await service.upsertAllocations('p1', [
      { technicianId: 't1', percentage: 50 }
    ]);

    expect(projectModel.findById).toHaveBeenCalledWith('p1');
    expect(payableModel.findOneAndUpdate).toHaveBeenCalledWith(
      { projectId: 'p1', technicianId: 't1' },
      { projectId: 'p1', technicianId: 't1', percentage: 50, amountDue: 500 },
      { upsert: true, new: true }
    );
  });

  it('marks payable as paid', async () => {
    payableModel.findByIdAndUpdate.mockResolvedValue({});
    await service.markPaid('1');
    expect(payableModel.findByIdAndUpdate).toHaveBeenCalled();
  });
});
