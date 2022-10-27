module.exports = { parseToProto }

let testJson = '{"type":"cat","name":"Mimi","age":3}'
let testObj = JSON.parse(testJson)
let testProto = {category: "animal", test: "awesome"}

function parseToProto(json, proto) {
    let out
    if (proto == null) {
        out = Object.prototype
    } else {
        out = Object.create(proto)
    }

    if (json != null) {
        let parsed = JSON.parse(json)
        Object.keys(parsed).forEach(key => {
            out[key] = parsed[key]
        });
    }
    return out
}

it("should combine the given JSON and prototye", function() {
    let obj = parseToProto(testJson, testProto)
    Object.keys(obj).forEach(key => {
        expect(obj[key]).toEqual(testObj[key])
    })
    expect(Object.getPrototypeOf(obj)).toEqual(testProto)
})

it("should handle null JSONs", function() {
    let obj = parseToProto(null, testProto)
    expect(Object.getPrototypeOf(obj)).toEqual(testProto)
})

it("should handle null prototypes", function() {
    let obj = parseToProto(testJson, null)
    Object.keys(obj).forEach(key => {
        expect(obj[key]).toEqual(testObj[key])
    })
    console.log(Object.getPrototypeOf(obj))
})