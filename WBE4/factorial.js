module.exports = { factorial }

function factorial(num) {
    if (num < 0) {
        throw "Parameter is negative."
    }
    let out = BigInt(1)
    for (let index = BigInt(1); index <= num; index++) {
        out *= index
    }

    if (typeof num === "bigint") {
        return out
    }
    return Number(out)
}