import { find } from 'lodash'

export default {
  /**
   * Check if a log has deletion pending
   */
  isLogDeletionPending: state => logId =>
    state.logDeletionPending.includes(logId),

  /**
   * Get log by id
   */
  getLogById: state => logId => find(state.logs, log => log.id === logId),

  /**
   * Get log by id as Array
   */
  getLogArrayById: state => logId => {
    const result = []
    const logObject = find(state.logs, log => log.id === logId)
    Object.keys(logObject).map(i =>
      result.push({ label: i, value: logObject[i] })
    )
    return result
  },

  /**
   * Get log by id as Array
   */
  getLogsByDate: state => date => {
    console.log({ state, date })
    const result = []
    const logObject = find(state.logs, log => log.date === date)
    Object.keys(logObject).map(i =>
      result.push({ label: i, value: logObject[i] })
    )
    return result
  }
}
