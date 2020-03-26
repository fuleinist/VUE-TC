import actions from '@/store/jobs/jobs.actions'

jest.mock('@/firebase/user-jobs-db', () => ({
  UserJobsDB: jest.mock()
}))

const mockUsersDbReadAll = jest.fn()
const mockUsersDbCreate = jest.fn()
const mockUsersDbDelete = jest.fn()
jest.mock('@/firebase/user-jobs-db', () =>
  jest.fn().mockImplementation(() => ({
    readAll: mockUsersDbReadAll,
    create: mockUsersDbCreate,
    delete: mockUsersDbDelete
  }))
)

const commit = jest.fn()
const dispatch = jest.fn()
const isJobDeletionPending = jest.fn()
const userId = 11
const user = { id: userId }
const job1 = { id: 1, name: 'job1' }
const job2 = { id: 2, name: 'job2' }
const rootState = {
  authentication: {
    user
  }
}
const getters = {
  isJobDeletionPending
}

afterEach(() => {
  commit.mockReset()
  dispatch.mockReset()
  mockUsersDbReadAll.mockReset()
  mockUsersDbCreate.mockReset()
  mockUsersDbDelete.mockReset()
  isJobDeletionPending.mockReset()
})

describe('jobs module action', () => {
  describe('getUserJobs', () => {
    it('should set jobs with ones owned by the current user', async () => {
      mockUsersDbReadAll.mockResolvedValue([job1, job2])
      await actions.getUserJobs({ commit, rootState })
      expect(commit).toHaveBeenCalledWith('setJobs', [job1, job2])
    })
  })

  describe('createUserJob', () => {
    it('should set job creation as pending first', async () => {
      mockUsersDbCreate.mockResolvedValue(job2)
      await actions.createUserJob({ commit, rootState })
      expect(commit).toHaveBeenNthCalledWith(1, 'setJobCreationPending', true)
    })

    it('should add job', async () => {
      mockUsersDbCreate.mockResolvedValue(job2)
      await actions.createUserJob({ commit, rootState }, job1)
      expect(commit).toHaveBeenNthCalledWith(2, 'addJob', job2)
    })

    it('should set job creation as not pending after adding job', async () => {
      mockUsersDbCreate.mockResolvedValue(job2)
      await actions.createUserJob({ commit, rootState }, job1)
      expect(commit).toHaveBeenNthCalledWith(3, 'setJobCreationPending', false)
    })
  })

  describe('triggerAddJobAction', () => {
    describe('when the name of the job is empty', () => {
      const state = {
        jobNameToCreate: '',
        jobCategoryToCreate: '',
        jobCountToCreate: 0
      }

      it('should not set input name to empty', () => {
        actions.triggerAddJobAction({ dispatch, state, commit })
        expect(commit).not.toHaveBeenCalled()
      })

      it('should not dispatch create job action', () => {
        actions.triggerAddJobAction({ dispatch, state, commit })
        expect(dispatch).not.toHaveBeenCalled()
      })
    })

    describe('when the name of the job is not empty', () => {
      const state = {
        jobNameToCreate: 'todo',
        jobCategoryToCreate: 'test'
      }

      it('should set input name to empty', () => {
        actions.triggerAddJobAction({ dispatch, state, commit })
        expect(commit).toHaveBeenCalledWith('setJobNameToCreate', '')
      })

      it('should dispatch create job action', () => {
        actions.triggerAddJobAction({ dispatch, state, commit })
        expect(dispatch).toHaveBeenCalledWith('createUserJob', {
          name: 'todo'
        })
      })
    })
  })

  describe('deleteUserJob', () => {
    describe('when the job is currently being deleted', () => {
      it('should not do anything', async () => {
        isJobDeletionPending.mockReturnValue(true)
        await actions.deleteUserJob({ commit, rootState, getters }, 1)
        expect(commit).not.toHaveBeenCalled()
      })
    })

    describe('when the job is not currently being deleted', () => {
      it('should set job as deletion pending first', async () => {
        getters.isJobDeletionPending.mockReturnValue(false)
        await actions.deleteUserJob({ commit, rootState, getters }, 1)
        expect(commit).toHaveBeenNthCalledWith(1, 'addJobDeletionPending', 1)
      })

      it('should remove job in store', async () => {
        await actions.deleteUserJob({ commit, rootState, getters }, 1)
        expect(commit).toHaveBeenNthCalledWith(2, 'removeJobById', 1)
      })

      it('should remove job in db', async () => {
        await actions.deleteUserJob({ commit, rootState, getters }, 1)
        expect(mockUsersDbDelete).toHaveBeenCalledWith(1)
      })

      it('should set job as not deletion pending after having removed the job', async () => {
        await actions.deleteUserJob({ commit, rootState, getters }, 1)
        expect(commit).toHaveBeenNthCalledWith(3, 'removeJobDeletionPending', 1)
      })
    })
  })
})
