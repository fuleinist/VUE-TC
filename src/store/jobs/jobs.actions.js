import JobsDB from '@/firebase/jobs-db'
import { firstDateOfYear, lastDateOfYear } from '@/support/date.support'

export default {
  /**
   * Fetch all jobs
   */
  getJobs: async ({ commit }) => {
    const jobsDb = new JobsDB()
    const jobs = await jobsDb.readAll()
    commit('setJobs', jobs)
  },

  /**
   * Fetch all jobs created after a date
   */
  getJobsAfterDate: async ({ commit }, date) => {
    const jobsDb = new JobsDB()
    const jobs = await jobsDb.readWhere([('createTimestamp', '>=', date)])
    commit('setJobs', jobs)
  },

  /**
   * Fetch all jobs created after a date
   */
  getJobsbyYear: async ({ commit }, year) => {
    const jobsDb = new JobsDB()
    const jobs = await jobsDb.readWhere([
      ('createTimestamp', '>=', firstDateOfYear(year)),
      ('createTimestamp', '>=', lastDateOfYear(year))
    ])
    commit('setJobs', jobs)
  },

  /**
   * Create a job for current loggedin user
   */
  createJob: async ({ commit, rootState }, job) => {
    const jobsDb = new JobsDB()

    job.userId = rootState.authentication.user.id

    commit('setJobCreationPending', true)
    const createdJob = await jobsDb.create(job)
    commit('addJob', createdJob)
    commit('setJobCreationPending', false)
  },

  /**
   * Update a job for current loggedin user
   */
  updateJob: async ({ commit, rootState }, job) => {
    const jobsDb = new JobsDB()

    job.userId = rootState.authentication.user.id

    commit('setJobUpdatePending', true)
    const updatedJob = await jobsDb.update(job)
    commit('updateJob', updatedJob)
    commit('setJobUpdatePending', false)
  },

  /**
   * Create a new job for current loggedin user and reset job name input
   */
  triggerAddJobAction: ({ dispatch, state, commit }) => {
    if (state.jobNameToCreate === '') return
    const job = state.jobToCreate
    dispatch('createJob', job)
    commit('clearJobToCreate')
  },

  /**
   * Update a new job for current loggedin user and reset job name input
   */
  triggerUpdateJobAction: ({ dispatch, state, commit }) => {
    if (state.jobNameToUpdate === '') return
    const job = state.jobToUpdate
    dispatch('updateJob', job)
    commit('clearJobToUpdate')
  },

  /**
   * Delete a job from its id
   */
  deleteJob: async ({ commit, getters }, jobId) => {
    if (getters.isJobDeletionPending(jobId)) return
    const jobsDb = new JobsDB()
    commit('addJobDeletionPending', jobId)
    await jobsDb.delete(jobId)
    commit('removeJobById', jobId)
    commit('removeJobDeletionPending', jobId)
  }
}
