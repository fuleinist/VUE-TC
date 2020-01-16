import mutations from '@/store/jobs/jobs.mutations'
import { cloneDeep } from 'lodash'

const job1 = { id: 1, name: 'job1' }
const job2 = { id: 2, name: 'job2' }
const baseState = {
  jobs: [job1, job2],
  jobNameToCreate: '',
  jobDeletionPending: [1],
  jobCreationPending: false
}

describe('jobs module mutations', () => {
  describe('setJobNameToCreate', () => {
    it('should set job name to create correctly', () => {
      const state = cloneDeep(baseState)
      mutations.setJobNameToCreate(state, 'toto')
      expect(state).toEqual({
        ...baseState,
        jobNameToCreate: 'toto'
      })
    })
  })

  describe('setJobs', () => {
    it('should set jobs correctly', () => {
      const state = { ...cloneDeep(baseState), jobs: [] }
      mutations.setJobs(state, [job2, job1])
      expect(state).toEqual({
        ...baseState,
        jobs: [job2, job1]
      })
    })
  })

  describe('addJobs', () => {
    it('should add job correctly', () => {
      const state = { ...cloneDeep(baseState), jobs: [] }
      mutations.addJob(state, job1)
      expect(state).toEqual({
        ...baseState,
        jobs: [job1]
      })
    })
  })

  describe('removeJobById', () => {
    it('should remove job correctly', () => {
      const state = cloneDeep(baseState)
      mutations.removeJobById(state, 2)
      expect(state).toEqual({
        ...baseState,
        jobs: [job1]
      })
    })
  })

  describe('addJobDeletionPending', () => {
    it('should mark job as deletion correctly', () => {
      const state = cloneDeep(baseState)
      mutations.addJobDeletionPending(state, 2)
      expect(state).toEqual({
        ...baseState,
        jobDeletionPending: [1, 2]
      })
    })
  })

  describe('removeJobDeletionPending', () => {
    it('should unmark job as deletion correctly', () => {
      const state = cloneDeep(baseState)
      mutations.removeJobDeletionPending(state, 1)
      expect(state).toEqual({
        ...baseState,
        jobDeletionPending: []
      })
    })
  })

  describe('setJobCreationPending', () => {
    it('should set job creation pending correctly', () => {
      const state = cloneDeep(baseState)
      mutations.setJobCreationPending(state, true)
      expect(state).toEqual({
        ...baseState,
        jobCreationPending: true
      })
    })
  })
})
