import reducer, { login, logout } from '../../../client/src/store/authSlice'

beforeEach(() => {
  window.localStorage.clear()
  jest.spyOn(window.localStorage, 'setItem')
  jest.spyOn(window.localStorage, 'removeItem')
})

describe('authSlice', () => {
  it('handles login lifecycle', () => {
    const state = reducer(undefined, login.pending('', { email: '', password: '' }))
    expect(state.status).toBe('loading')
    const user = { id: '1' }
    const next = reducer(state, login.fulfilled({ user, token: 't' }, '', { email: '', password: '' }))
    expect(next.status).toBe('idle')
    expect(next.user).toEqual(user)
    expect(next.token).toBe('t')
    expect(window.localStorage.setItem).toHaveBeenCalledWith('authToken', 't')
    expect(window.localStorage.setItem).toHaveBeenCalledWith('authUser', JSON.stringify(user))
  })

  it('initializes from localStorage', () => {
    window.localStorage.setItem('authToken', 'tok')
    window.localStorage.setItem('authUser', JSON.stringify({ id: 2 }))
    const state = reducer(undefined, { type: 'init' } as any)
    expect(state.token).toBe('tok')
    expect(state.user).toEqual({ id: 2 })
  })

  it('handles logout', () => {
    const state = reducer({ user: { id: 1 }, token: 't', status: 'idle' }, logout())
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
    expect(window.localStorage.removeItem).toHaveBeenCalledWith('authToken')
    expect(window.localStorage.removeItem).toHaveBeenCalledWith('authUser')
  })
})
