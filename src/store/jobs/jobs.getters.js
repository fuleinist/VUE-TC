import { find } from 'lodash'

export default {
  /**
   * Check if a job has deletion pending
   */
  isJobDeletionPending: state => jobId =>
    state.jobDeletionPending.includes(jobId),

  /**
   * Get job by id
   */
  getJobById: state => jobId => find(state.jobs, job => job.id === jobId),

  /**
   * Get job by id as Array
   */
  getJobArrayById: state => jobId => {
    const result = []
    const jobObject = find(state.jobs, job => job.id === jobId)
    Object.keys(jobObject).map(i =>
      result.push({ label: i, value: jobObject[i] })
    )
    return result
  }
}
