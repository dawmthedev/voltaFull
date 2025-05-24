export const PROJECTS = [
  {
    id: 1,
    name: 'John Doe',
    saleDate: '2023-09-01',
    financing: 'Cash',
    products: 'Solar',
    progress: '0.5',
    email: 'john@example.com',
    address: '123 Main St',
    contractAmount: '25000',
    addersTotal: '3000',
    dealerFee: '1200',
    ppwFinal: '3.5',
    installer: 'Installer A',
    status: 'Active',
    vcadders: [
      { id: 1, description: 'Adder 1', status: 'Pending', price: '500' }
    ],
    vcmessages: [
      { id: 1, text: 'Welcome to the project', createdAt: '2023-09-02', from: 'Admin' }
    ],
    vccommissions: [
      { id: 1, milestone: 'Sale', user: 'Rep A', amount: '1000', status: 'Paid', datePaid: '2023-09-15' }
    ],
    welcomeDate: '2023-09-05',
    siteSurveyDate: '2023-09-10',
    NTPDate: '2023-09-15',
    QcChecDate: '2023-09-16',
    plansReceived: '2023-09-20',
    fdacp: '2023-09-21',
    FLADate: '2023-09-30',
    SolarPermitDate: '2023-10-05',
    solarInstallDate: '2023-10-12',
    FIDate: '2023-10-15',
    PTODate: '2023-10-20'
  },
  {
    id: 2,
    name: 'Jane Smith',
    saleDate: '2023-08-10',
    financing: 'Loan',
    products: 'Solar, Battery',
    progress: '0.8',
    email: 'jane@example.com',
    address: '456 Oak Ave',
    contractAmount: '30000',
    addersTotal: '2000',
    dealerFee: '1500',
    ppwFinal: '3.2',
    installer: 'Installer B',
    status: 'Inactive',
    vcadders: [],
    vcmessages: [],
    vccommissions: [],
    welcomeDate: '2023-08-15',
    siteSurveyDate: '2023-08-20',
    NTPDate: '2023-08-25'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    saleDate: '2023-07-05',
    financing: 'Lease',
    products: 'Solar',
    progress: '1',
    email: 'alice@example.com',
    address: '789 Pine Rd',
    contractAmount: '28000',
    addersTotal: '2500',
    dealerFee: '1300',
    ppwFinal: '2.9',
    installer: 'Installer C',
    status: 'Active',
    vcadders: [],
    vcmessages: [],
    vccommissions: []
  }
];
