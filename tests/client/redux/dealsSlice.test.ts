import reducer, { fetchDeals } from '../../../client/src/store/dealsSlice'

interface Deal { id: string; name: string }

describe('dealsSlice', () => {
  it('stores deals on success', () => {
    const pending = reducer(undefined, fetchDeals.pending(''))
    expect(pending.status).toBe('loading')
    const deals: Deal[] = [{ id: '1', name: 'Test' }]
    const next = reducer(pending, fetchDeals.fulfilled(deals, ''))
    expect(next.items).toEqual(deals)
    expect(next.status).toBe('idle')
  })
})
