import reducer, { fetchUnpaid, markPaid, PayableRecord } from '../../../client/src/store/accountsPayableSlice'

describe('accountsPayableSlice', () => {
  it('stores records on fetch', () => {
    const pending = reducer(undefined, fetchUnpaid.pending(''))
    expect(pending.status).toBe('loading')
    const items: PayableRecord[] = [
      {
        projectId: 'p1',
        projectName: 'Project 1',
        techId: 't1',
        allocationPct: 50,
        amountDue: 1000,
        paid: false,
      },
    ]
    const next = reducer(pending, fetchUnpaid.fulfilled(items, ''))
    expect(next.items).toEqual(items)
    expect(next.status).toBe('idle')
  })

  it('updates status when marking paid', () => {
    const start = {
      items: [
        {
          projectId: 'p1',
          projectName: 'Project 1',
          techId: 't1',
          allocationPct: 50,
          amountDue: 1000,
          paid: false,
        },
      ],
      status: 'idle' as const,
    }
    let state = reducer(
      start,
      markPaid.pending('req', {
        projectId: 'p1',
        payroll: [{ technicianId: 't1', percentage: 50, paid: true }],
      })
    )
    expect(state.status).toBe('loading')
    state = reducer(
      state,
      markPaid.fulfilled({}, 'req', {
        projectId: 'p1',
        payroll: [{ technicianId: 't1', percentage: 50, paid: true }],
      })
    )
    expect(state.status).toBe('idle')
    expect(state.items).toEqual(start.items)
  })
})
