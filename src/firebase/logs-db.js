import GenericDB from './generic-db'

export default class LogsDB extends GenericDB {
  constructor() {
    super(`logs`)
  }

  // Here you can extend JobLogsDB with custom methods
}
