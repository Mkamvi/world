/**
* auhtor: iWuzhi
* date: 2020-04-17 21:52:49
*/
/**
  0, 0 => 1
  0, 1 => 0
  1, 0 => 0
  1, 1 => 1 
 */
const xor = require('./xor')
const not = require('./not')

module.exports = (a, b) => {
  return not(xor(a, b))
}