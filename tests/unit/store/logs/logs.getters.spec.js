import getters from '@/store/logs/logs.getters'

const state = { logDeletionPending: [1, 2, 3] }

describe('logs module getters', () => {
  describe('isLogDeletionPending', () => {
    it('should return true if the given log id is marked as pending', () => {
      const result = getters.isLogDeletionPending(state)(1)
      expect(result).toBe(true)
    })

    it('should return false if the given log id is not marked as pending', () => {
      const result = getters.isLogDeletionPending(state)(4)
      expect(result).toBe(false)
    })
  })
})
