import reducer, { fetchUsers } from '../../../client/src/store/usersSlice'

interface User { _id?: string; name: string; email: string; role: string }

describe('usersSlice', () => {
  it('stores users on fetch', () => {
    const pending = reducer(undefined, fetchUsers.pending(''))
    expect(pending.status).toBe('loading')
    const users: User[] = [{ _id: '1', name: 'Alice', email: 'a@test.com', role: 'Admin' }]
    const next = reducer(pending, fetchUsers.fulfilled(users, ''))
    expect(next.items).toEqual(users)
    expect(next.status).toBe('idle')
  })
})
