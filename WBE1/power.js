"use strict"
const assert = require('assert')

module.exports = { power }

/**
 * Calculates the power of a number
 * @param {Number} base 
 * @param {Number} exponent 
 */
function power(base, exponent) {
    assert(Number.isInteger(base))
    assert(Number.isInteger(exponent))
    assert(base >= 0)
    assert(exponent >= 0)
    if (exponent == 0) {
        return 1
    } else if (exponent % 2 == 0) {
        return power(base, exponent / 2) ** 2
    } else {
        return power(base, exponent - 1) * base
    }
}