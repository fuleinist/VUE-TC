import LogsDB from '@/firebase/logs-db'

export default {
  /**
   * Fetch all logs
   * @async
   */
  getLogs: async ({ commit }) => {
    const logsDb = new LogsDB()
    const logs = await logsDb.readAll()
    commit('setLogs', logs)
  },

  /**
   * Fetch logs by date and user
   * @async
   */
  getLogsByDateNUser: async ({ commit, rootState }, date) => {
    const logsDb = new LogsDB()
    const logs = await logsDb.readWhere([
      { a: `date`, b: `==`, c: date },
      { a: `userId`, b: `==`, c: rootState.authentication.user.id }
    ])
    commit('setLogs', logs)
  },

  /**
   * Fetch logs by job
   * @async
   */
  getLogsByJob: async ({ commit }, job) => {
    const logsDb = new LogsDB()
    const logs = await logsDb.readWhere([('jobId', '==', job.id)])
    commit('setLogs', logs)
  },

  /**
   * Create a log for current job
   * @async
   */
  createLog: async ({ commit, rootState }, { job, log }) => {
    console.log({ commit, rootState, job, log })
    const logsDb = new LogsDB()
    // assign jobId and userId accordingly
    log.jobId = job ? job.id : ''
    log.userId = rootState.authentication.user.id
    commit('setLogCreationPending', true)
    const createdLog = await logsDb.create(log)
    commit('addLog', createdLog)
    commit('setLogCreationPending', false)
  },

  /**
   * Create a new log for current job and reset log inputs
   * @async
   */
  triggerAddLogAction: ({ dispatch, state, commit }) => {
    if (state.logNameToCreate === '') return
    const log = state.logToCreate
    commit('setLogToCreate', {})
    dispatch('createLog', log)
  },

  /**
   * Delete a job log from its id
   * @async
   */
  deleteJobLog: async ({ commit, getters }, logId) => {
    if (getters.islogDeletionPending(logId)) return

    const logsDb = new LogsDB()

    commit('addlogDeletionPending', logId)
    await logsDb.delete(logId)
    commit('removelogById', logId)
    commit('removelogDeletionPending', logId)
  }
}
