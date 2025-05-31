import { AccountsPayableService } from '../../../server/src/services/AccountsPayableService';

describe('AccountsPayableService', () => {
  let payableModel: any;
  let projectModel: any;
  let legacyModel: any;
  let adminModel: any;
  let service: AccountsPayableService;

  beforeEach(() => {
    payableModel = {
      findOneAndUpdate: jest.fn(),
      find: jest.fn(),
      findByIdAndUpdate: jest.fn(),
    } as any;
    projectModel = {
      findById: jest.fn(),
      find: jest.fn(),
    } as any;
    legacyModel = { find: jest.fn() } as any;
    adminModel = { find: jest.fn() } as any;
    service = new AccountsPayableService(
      payableModel,
      projectModel,
      legacyModel,
      adminModel
    );
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
    projectModel.findById.mockResolvedValue({ contractAmount: 1000, homeowner: 'Home' });
    adminModel.find.mockResolvedValue([{ _id: 't1', name: 'Tech' }]);
    payableModel.findOneAndUpdate.mockResolvedValue({});

    await service.upsertAllocations('p1', [
      { technicianId: 't1', percentage: 50 }
    ]);

    expect(projectModel.findById).toHaveBeenCalledWith('p1');
    expect(payableModel.findOneAndUpdate).toHaveBeenCalledWith(
      { projectId: 'p1', technicianId: 't1' },
      {
        projectId: 'p1',
        technicianId: 't1',
        technicianName: 'Tech',
        projectName: 'Home',
        percentage: 50,
        amountDue: 500,
      },
      { upsert: true, new: true }
    );
  });

  it('marks payable as paid', async () => {
    payableModel.findByIdAndUpdate.mockResolvedValue({});
    await service.markPaid('1');
    expect(payableModel.findByIdAndUpdate).toHaveBeenCalled();
  });

  it('lists accounts grouped by project with status', async () => {
    const docs = [
      {
        projectId: 'p1',
        projectName: 'Home',
        technicianId: 't1',
        technicianName: 'Tech',
        percentage: 50,
        paid: false,
        amountDue: 100,
      },
    ];
    payableModel.find.mockResolvedValue(docs);
    projectModel.find.mockReturnValue({
      lean: jest.fn().mockResolvedValue([
        { _id: 'p1', homeowner: 'Home', status: 'Paid out' },
      ]),
    } as any);

    const res = await service.listAllByProject();
    expect(res[0].status).toBe('Paid out');
    expect(res[0].projectName).toBe('Home');
  });

  it('migrates legacy records on first use', async () => {
    payableModel.countDocuments = jest.fn().mockResolvedValue(0);
    legacyModel.find.mockReturnValue({ lean: () => Promise.resolve([{ a: 1 }]) });
    payableModel.insertMany = jest.fn();

    await service.listByPaidStatus(false);

    expect(payableModel.insertMany).toHaveBeenCalled();
  });
});
