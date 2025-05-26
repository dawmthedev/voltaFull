import reducer, { fetchProjects, createProject } from '../../../client/src/store/projectsSlice'

describe('projectsSlice', () => {
  it('stores projects on fetch', () => {
    const pending = reducer(undefined, fetchProjects.pending(''))
    expect(pending.status).toBe('loading')
    const projects = [{ _id: '1', homeowner: 'Jane' }]
    const next = reducer(pending, fetchProjects.fulfilled(projects, ''))
    expect(next.items).toEqual(projects)
    expect(next.status).toBe('idle')
  })

  it('adds project on create', () => {
    const state = reducer(undefined, fetchProjects.fulfilled([], ''))
    const project = { _id: '2', homeowner: 'John' }
    const next = reducer(state, createProject.fulfilled(project, ''))
    expect(next.items).toContain(project)
  })
})
