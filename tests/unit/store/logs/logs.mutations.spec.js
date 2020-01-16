import mutations from '@/store/logs/logs.mutations'
import { cloneDeep } from 'lodash'

const log1 = { id: 1, name: 'log1' }
const log2 = { id: 2, name: 'log2' }
const baseState = {
  logs: [log1, log2],
  logNameToCreate: '',
  logDeletionPending: [1],
  logCreationPending: false
}

describe('logs module mutations', () => {
  describe('setLogNameToCreate', () => {
    it('should set log name to create correctly', () => {
      const state = cloneDeep(baseState)
      mutations.setLogNameToCreate(state, 'toto')
      expect(state).toEqual({
        ...baseState,
        logNameToCreate: 'toto'
      })
    })
  })

  describe('setLogs', () => {
    it('should set logs correctly', () => {
      const state = { ...cloneDeep(baseState), logs: [] }
      mutations.setLogs(state, [log2, log1])
      expect(state).toEqual({
        ...baseState,
        logs: [log2, log1]
      })
    })
  })

  describe('addLogs', () => {
    it('should add log correctly', () => {
      const state = { ...cloneDeep(baseState), logs: [] }
      mutations.addLog(state, log1)
      expect(state).toEqual({
        ...baseState,
        logs: [log1]
      })
    })
  })

  describe('removeLogById', () => {
    it('should remove log correctly', () => {
      const state = cloneDeep(baseState)
      mutations.removeLogById(state, 2)
      expect(state).toEqual({
        ...baseState,
        logs: [log1]
      })
    })
  })

  describe('addLogDeletionPending', () => {
    it('should mark log as deletion correctly', () => {
      const state = cloneDeep(baseState)
      mutations.addLogDeletionPending(state, 2)
      expect(state).toEqual({
        ...baseState,
        logDeletionPending: [1, 2]
      })
    })
  })

  describe('removeLogDeletionPending', () => {
    it('should unmark log as deletion correctly', () => {
      const state = cloneDeep(baseState)
      mutations.removeLogDeletionPending(state, 1)
      expect(state).toEqual({
        ...baseState,
        logDeletionPending: []
      })
    })
  })

  describe('setLogCreationPending', () => {
    it('should set log creation pending correctly', () => {
      const state = cloneDeep(baseState)
      mutations.setLogCreationPending(state, true)
      expect(state).toEqual({
        ...baseState,
        logCreationPending: true
      })
    })
  })
})
