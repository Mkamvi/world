/**
* auhtor: iWuzhi
* date: 2020-04-17 21:52:49
*/
/**
  0, 0 => 0 or
  0, 1 => 1 or | n_and
  1, 0 => 1 or | n_and
  1, 1 => 0  n_and
 */
const and = require('./and')
const or = require('./or')
const n_and = require('./n_and')

module.exports = (a, b) => {
  return and(or(a, b), n_and(a, b))
}