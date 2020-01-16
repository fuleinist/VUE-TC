export default {
  /* Log input name */
  // setLogNameToCreate: (state, logNameToCreate) =>
  //   (state.logToCreate.name = logNameToCreate),
  // /* Log input category */
  // setLogCategoryToCreate: (state, logCategoryToCreate) =>
  //   (state.logToCreate = logCategoryToCreate),

  // /* Log input category */
  // setLogCountToCreate: (state, logCountToCreate) =>
  //   (state.logCountToCreate = logCountToCreate),
  /* Log input */
  setLogToCreate: (state, { label, value }) => {
    return label && value ? (state.logToCreate[label] = value) : state
  },
  clearLogToCreate: state => {
    state.logToCreate = {}
  },
  /* Logs */
  setLogs: (state, logs) => (state.logs = logs),
  addLog: (state, log) => state.logs.push(log),
  removeLogById: (state, logId) => {
    const index = state.logs.findIndex(log => log.id === logId)
    state.logs.splice(index, 1)
  },

  /* Logs deletion */
  addLogDeletionPending: (state, logId) => state.logDeletionPending.push(logId),
  removeLogDeletionPending: (state, logId) => {
    const index = state.logs.findIndex(log => log.id === logId)
    state.logDeletionPending.splice(index, 1)
  },

  /* Log creation */
  setLogCreationPending: (state, value) => (state.logCreationPending = value)
}
