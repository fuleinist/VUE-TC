import getters from '@/store/jobs/jobs.getters'

const state = { jobDeletionPending: [1, 2, 3] }

describe('jobs module getters', () => {
  describe('isJobDeletionPending', () => {
    it('should return true if the given job id is marked as pending', () => {
      const result = getters.isJobDeletionPending(state)(1)
      expect(result).toBe(true)
    })

    it('should return false if the given job id is not marked as pending', () => {
      const result = getters.isJobDeletionPending(state)(4)
      expect(result).toBe(false)
    })
  })
})
