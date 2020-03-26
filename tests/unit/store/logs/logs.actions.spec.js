import actions from '@/store/logs/logs.actions'

jest.mock('@/firebase/user-logs-db', () => ({
  UserLogsDB: jest.mock()
}))

const mockUsersDbReadAll = jest.fn()
const mockUsersDbCreate = jest.fn()
const mockUsersDbDelete = jest.fn()
jest.mock('@/firebase/user-logs-db', () =>
  jest.fn().mockImplementation(() => ({
    readAll: mockUsersDbReadAll,
    create: mockUsersDbCreate,
    delete: mockUsersDbDelete
  }))
)

const commit = jest.fn()
const dispatch = jest.fn()
const isLogDeletionPending = jest.fn()
const userId = 11
const user = { id: userId }
const log1 = { id: 1, name: 'log1' }
const log2 = { id: 2, name: 'log2' }
const rootState = {
  authentication: {
    user
  }
}
const getters = {
  isLogDeletionPending
}

afterEach(() => {
  commit.mockReset()
  dispatch.mockReset()
  mockUsersDbReadAll.mockReset()
  mockUsersDbCreate.mockReset()
  mockUsersDbDelete.mockReset()
  isLogDeletionPending.mockReset()
})

describe('logs module action', () => {
  describe('getUserLogs', () => {
    it('should set logs with ones owned by the current user', async () => {
      mockUsersDbReadAll.mockResolvedValue([log1, log2])
      await actions.getUserLogs({ commit, rootState })
      expect(commit).toHaveBeenCalledWith('setLogs', [log1, log2])
    })
  })

  describe('createUserLog', () => {
    it('should set log creation as pending first', async () => {
      mockUsersDbCreate.mockResolvedValue(log2)
      await actions.createUserLog({ commit, rootState })
      expect(commit).toHaveBeenNthCalledWith(1, 'setLogCreationPending', true)
    })

    it('should add log', async () => {
      mockUsersDbCreate.mockResolvedValue(log2)
      await actions.createUserLog({ commit, rootState }, log1)
      expect(commit).toHaveBeenNthCalledWith(2, 'addLog', log2)
    })

    it('should set log creation as not pending after adding log', async () => {
      mockUsersDbCreate.mockResolvedValue(log2)
      await actions.createUserLog({ commit, rootState }, log1)
      expect(commit).toHaveBeenNthCalledWith(3, 'setLogCreationPending', false)
    })
  })

  describe('triggerAddLogAction', () => {
    describe('when the name of the log is empty', () => {
      const state = {
        logNameToCreate: '',
        logCategoryToCreate: '',
        logCountToCreate: 0
      }

      it('should not set input name to empty', () => {
        actions.triggerAddLogAction({ dispatch, state, commit })
        expect(commit).not.toHaveBeenCalled()
      })

      it('should not dispatch create log action', () => {
        actions.triggerAddLogAction({ dispatch, state, commit })
        expect(dispatch).not.toHaveBeenCalled()
      })
    })

    describe('when the name of the log is not empty', () => {
      const state = {
        logNameToCreate: 'todo',
        logCategoryToCreate: 'test'
      }

      it('should set input name to empty', () => {
        actions.triggerAddLogAction({ dispatch, state, commit })
        expect(commit).toHaveBeenCalledWith('setLogNameToCreate', '')
      })

      it('should dispatch create log action', () => {
        actions.triggerAddLogAction({ dispatch, state, commit })
        expect(dispatch).toHaveBeenCalledWith('createUserLog', {
          name: 'todo'
        })
      })
    })
  })

  describe('deleteUserLog', () => {
    describe('when the log is currently being deleted', () => {
      it('should not do anything', async () => {
        isLogDeletionPending.mockReturnValue(true)
        await actions.deleteUserLog({ commit, rootState, getters }, 1)
        expect(commit).not.toHaveBeenCalled()
      })
    })

    describe('when the log is not currently being deleted', () => {
      it('should set log as deletion pending first', async () => {
        getters.isLogDeletionPending.mockReturnValue(false)
        await actions.deleteUserLog({ commit, rootState, getters }, 1)
        expect(commit).toHaveBeenNthCalledWith(1, 'addLogDeletionPending', 1)
      })

      it('should remove log in store', async () => {
        await actions.deleteUserLog({ commit, rootState, getters }, 1)
        expect(commit).toHaveBeenNthCalledWith(2, 'removeLogById', 1)
      })

      it('should remove log in db', async () => {
        await actions.deleteUserLog({ commit, rootState, getters }, 1)
        expect(mockUsersDbDelete).toHaveBeenCalledWith(1)
      })

      it('should set log as not deletion pending after having removed the log', async () => {
        await actions.deleteUserLog({ commit, rootState, getters }, 1)
        expect(commit).toHaveBeenNthCalledWith(3, 'removeLogDeletionPending', 1)
      })
    })
  })
})
