import GenericDB from './generic-db'

export default class JobsDB extends GenericDB {
  constructor() {
    super(`jobs`)
  }

  // Here you can extend JobsDB with custom methods
}
