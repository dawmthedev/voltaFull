import reducer, { fetchUsers, updateUser } from '../../../client/src/store/usersSlice'

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

  it('handles update lifecycle', () => {
    let state = reducer(undefined, updateUser.pending(''))
    expect(state.status).toBe('loading')
    state = reducer(state, updateUser.fulfilled({} as any, ''))
    expect(state.status).toBe('idle')
  })
})
