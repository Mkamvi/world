/**
* auhtor: iWuzhi
* date: 2020-04-17 21:46:24
*/
const not = require('./not')
const and = require('./and')

module.exports = (...input) => {
  return not(and(...input))
}