import { transformCSVToProject, parseCSV } from '../../../server/src/services/ProjectService';

describe('ProjectService csv helpers', () => {
  it('parses CSV string', () => {
    const csv = 'Homeowner,Sale Date\nJohn,2024-01-01';
    const rows = parseCSV(csv);
    expect(rows).toEqual([{ Homeowner: 'John', 'Sale Date': '2024-01-01' }]);
  });

  it('transforms row to project', () => {
    const row = {
      Homeowner: 'John',
      'Sale Date': '2024-01-01',
      Products: 'Panel;Battery',
      'Contract Amount Final': '$100',
      'Solar Install - Status': 'Open',
      Stage: 'Planning',
      'Project Duration': '6m',
      'Final System Size (Watts)': '5000',
      Installer: 'Best Solar',
      Phone: '555',
      'Sales Rep': 'Sue',
      Address: '123 St',
      'Utility Company Text': 'PG&E',
      'PTO - Status': 'In Progress',
      'Project Manager': 'Bob',
      Financing: 'Cash',
      Source: 'Referral',
      AHJ: 'City',
      'QC Check - Status': 'Pending',
      email1: 'USER@TEST.COM'
    } as any;
    const proj = transformCSVToProject(row);
    expect(proj).toEqual({
      homeowner: 'John',
      saleDate: '2024-01-01',
      products: ['Panel', 'Battery'],
      status: 'Open',
      stage: 'Planning',
      contractAmount: 100,
      systemSize: '5000',

      phone: '555',
      address: '123 St',
      installer: 'Best Solar',
      utilityCompany: 'PG&E',
      salesRep: 'Sue',
      projectManager: 'Bob',
      financing: 'Cash',
      source: 'Referral',
      ahj: 'City',
      qcStatus: 'Pending',
      ptoStatus: 'In Progress',

      assignedTo: 'user@test.com',
      duration: '6m'
    });
  });
});
