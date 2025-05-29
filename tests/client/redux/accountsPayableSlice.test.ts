import reducer, { fetchUnpaid, markPaid, PayableRecord } from '../../../client/src/store/accountsPayableSlice'

describe('accountsPayableSlice', () => {
  it('stores records on fetch', () => {
    const pending = reducer(undefined, fetchUnpaid.pending(''))
    expect(pending.status).toBe('loading')
    const items: PayableRecord[] = [{ _id: '1', project: 'P', technician: 'T' }]
    const next = reducer(pending, fetchUnpaid.fulfilled(items, ''))
    expect(next.items).toEqual(items)
    expect(next.status).toBe('idle')
  })

  it('optimistically removes item when marking paid', () => {
    const start = { items: [{ _id: '1', project: 'P', technician: 'T' }], status: 'idle' as const }
    const next = reducer(start, markPaid.pending('req', '1'))
    expect(next.items).toEqual([])
  })
})
