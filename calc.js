/**
* auhtor: iWuzhi
* date: 2020-04-17 22:11:25
*/


const assert = require('assert').strict;

const xor = require('./xor')
const and = require('./and')
const or = require('./or')

/**
  1位加法器|半加器
 */
function add(a, b) {
  let sum = xor(a, b)
  let carry = and(a, b)
  return [carry, sum]
}

assert.deepStrictEqual(add(0, 0).join(''), '00')
assert.deepStrictEqual(add(0, 1).join(''), '01')
assert.deepStrictEqual(add(1, 0).join(''), '01')
assert.deepStrictEqual(add(1, 1).join(''), '10')

function fixArrayLength(arr, length) {
  return Array(length - arr.length).fill(0).concat(arr)
}
function testAddN(n, addN) {
  for (let i = 0; i < Math.pow(2, n); i ++) {
    const a = fixArrayLength(i.toString(2).split('').map(Number), n)
    for (let j = 0; j < Math.pow(2, n); j ++) {
      const b = fixArrayLength(j.toString(2).split('').map(Number), n)
      const expectResult = fixArrayLength((parseInt(a.join(''), 2) + parseInt(b.join(''), 2)).toString(2).split('').map(Number), n + 1)
      console.log(`${a.join('')} + ${b.join('')} = ${expectResult.join('')}`);
      assert.deepStrictEqual(addN(a, b).join(''), expectResult.join(''))
    }
  }
}
/**
  1位全加器
 */
function add_one(a, b, cf = 0) {
  const [c, s] = add(a[0], b[0])
  const [c2, s2] = add(cf, s)
  return [or(c, c2), s2]
}
// testAddN(1, add_one)

function add_four(a, b, cf = 0) {
  const [c0, a0] = add_one( [a[3]], [b[3]], cf)
  const [c1, a1] = add_one( [a[2]], [b[2]], c0,)
  const [c2, a2] = add_one( [a[1]], [b[1]], c1,)
  const [c3, a3] = add_one([a[0]], [b[0]], c2, )
  return [c3, a3, a2, a1, a0]
}
// testAddN(4, add_four)


function add_eight(a, b, cf = 0) {
  const r1 = add_four(a.slice(4, 8), b.splice(4, 8))
  const r2 = add_four(a.slice(0, 4), b.splice(0, 4), r1[0])
  return r2.concat(r1.slice(1))
}
// testAddN(8, add_eight)

function add_n(a, b, cf = 0) {
  let s = [], ct = cf;
  for (let i = a.length - 1; i >= 0; i --) {
    const [ci, si] = add_one([a[i]], [b[i]], ct)
    ct = ci;
    s.unshift(si)
  }
  s.unshift(ct)
  return s
}
testAddN(1, add_n)
// testAddN(4, add_n)
// testAddN(8, add_n)
// testAddN(16, add_n)
