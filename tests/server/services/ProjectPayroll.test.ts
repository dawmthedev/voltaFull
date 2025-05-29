import { ProjectService } from '../../../server/src/services/ProjectService';

describe('ProjectService payroll helpers', () => {
  let service: ProjectService;
  let projectModel: any;
  let payableModel: any;
  let payableService: any;

  beforeEach(() => {
    projectModel = {
      findById: jest.fn()
    } as any;
    payableModel = {
      find: jest.fn(),
      findOneAndUpdate: jest.fn()
    } as any;
    payableService = { listAllByProject: jest.fn() } as any;
    service = new ProjectService(projectModel, payableModel, payableService);
  });

  it('gets payroll records', async () => {
    payableModel.find.mockReturnValue({ lean: () => ({ exec: () => Promise.resolve([{ technicianId: 't1' }]) }) });
    const res = await service.getPayroll('p1');
    expect(res[0].technicianId).toBe('t1');
  });

  it('updates payroll entries', async () => {
    projectModel.findById.mockResolvedValue({ contractAmount: 100 });
    payableModel.findOneAndUpdate.mockResolvedValue({});

    await service.updatePayroll('p1', [{ technicianId: 't', percentage: 50 }]);
    expect(payableModel.findOneAndUpdate).toHaveBeenCalled();
  });
});
