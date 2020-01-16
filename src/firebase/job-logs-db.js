import GenericDB from './generic-db'

export default class JobLogsDB extends GenericDB {
  constructor(jobId) {
    super(`jobs/${jobId}/logs`)
  }

  // Here you can extend JobLogsDB with custom methods
}
