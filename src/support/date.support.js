/**
 * get first date of the provided year
 * @constructor
 * @param {string} year - The year to get for date
 * @returns {date} liunx date as the first date of year
 */
const firstDateOfYear = year => {
  const date = new Date(`Jan 01, ${year} 01:00:00`)
  return date
}
/**
 * get last date of the provided year
 * @constructor
 * @param {string} year - The year to get for date
 * @returns {date} liunx date as the last date of year
 */
const lastDateOfYear = year => {
  const date = new Date(`Dec 31, ${year} 23:00:00`)
  return date
}

export { firstDateOfYear, lastDateOfYear }
