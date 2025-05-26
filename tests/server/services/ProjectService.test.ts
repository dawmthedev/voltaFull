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
      'Contract Amount': '$100',
      'Solar Install - Status': 'Open',
      Stage: 'Planning',
      'Project Duration': '6m',
      'Final System Size (Watts)': '5000',
      email1: 'USER@TEST.COM'
    } as any;
    const proj = transformCSVToProject(row);
    expect(proj).toEqual({
      homeowner: 'John',
      saleDate: '2024-01-01',
      products: ['Panel', 'Battery'],
      contractAmount: 100,
      status: 'Open',
      stage: 'Planning',
      duration: '6m',
      systemSize: '5000',
      assignedTo: 'user@test.com'
    });
  });
});
