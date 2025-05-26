import reducer, { login, logout } from '../../../client/src/store/authSlice'

describe('authSlice', () => {
  it('handles login lifecycle', () => {
    const state = reducer(undefined, login.pending('', { email: '', password: '' }))
    expect(state.status).toBe('loading')
    const user = { id: '1' }
    const next = reducer(state, login.fulfilled({ user, token: 't' }, '', { email: '', password: '' }))
    expect(next.status).toBe('idle')
    expect(next.user).toEqual(user)
    expect(next.token).toBe('t')
  })

  it('handles logout', () => {
    const state = reducer({ user: { id: 1 }, token: 't', status: 'idle' }, logout())
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
  })
})
