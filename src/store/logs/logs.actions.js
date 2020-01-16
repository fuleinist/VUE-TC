import JobLogsDB from '@/firebase/job-logs-db'

export default {
  /**
   * Fetch logs of current job
   */
  getJobLogs: async ({ commit, job }) => {
    const jobLogsDb = new JobLogsDB(job.id)
    const logs = await jobLogsDb.readAll()
    commit('setLogs', logs)
  },

  /**
   * Create a log for current job
   */
  createJobLog: async ({ commit, rootState, job }, log) => {
    const jobLogsDb = new JobLogsDB(job.id)
    log.userId = rootState.authentication.user.id
    commit('setLogCreationPending', true)
    const createdJobLog = await jobLogsDb.create(log)
    commit('addLog', createdJobLog)
    commit('setLogCreationPending', false)
  },

  /**
   * Create a new log for current job and reset log inputs
   */
  triggerAddLogAction: ({ dispatch, state, commit }) => {
    if (state.logNameToCreate === '') return
    const log = state.logToCreate
    commit('setLogToCreate', {})
    dispatch('createLog', log)
  },

  /**
   * Delete a job log from its id
   */
  deleteJobLog: async ({ job, commit, getters }, logId) => {
    if (getters.islogDeletionPending(logId)) return

    const jobLogsDb = new JobLogsDB(job.id)

    commit('addlogDeletionPending', logId)
    await jobLogsDb.delete(logId)
    commit('removelogById', logId)
    commit('removelogDeletionPending', logId)
  }
}
