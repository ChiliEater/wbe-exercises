module.exports = { equal }

function equal(o1, o2) {
    if (o1 === o2) {
        return true
    }

    if (typeof o1 === "object" && typeof o2 == "object") {
        if (Object.keys(o1).length != Object.keys(o2).length) {
            return false
        }
        for (let key of Object.keys(o1)) {
            if (o1[key] !== o2[key]) {
                return false
            }
        }
        return true
    }

    return false
}

function deepEqual(o1, o2) {
    if (o1 === o2) {
        return true
    }

    if (typeof o1 === "object" && typeof o2 == "object") {
        if (Object.keys(o1).length != Object.keys(o2).length) {
            return false
        }
        for (let key of Object.keys(o1)) {
            if (!deepEqual(o1[key], o2[key])) {
                return false
            }
        }
        return true
    }

    return false
}

console.log(deepEqual(16, 16))
console.log(deepEqual("hi", "hi"))
console.log(deepEqual({}, {}))
console.log(deepEqual({a:1, b:2}, {b:2, a:1}))
console.log(deepEqual({a:1, b:2}, {c:3, b:2, a:1}))
console.log(deepEqual({a:{}}, {a:{}}))
let emptyObj = {}
console.log(deepEqual({a:emptyObj}, {a:emptyObj}))