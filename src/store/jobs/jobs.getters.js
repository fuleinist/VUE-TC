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
  getJobById: state => jobId => find(state.jobs, job => job.id === jobId)
}
