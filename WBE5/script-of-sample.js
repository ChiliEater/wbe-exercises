module.exports = { scriptOfSample, scriptOfString } 
//require("./scripts.js")
/**
 * 
 * @param {String} sample
 * @param {Array} scripts
 */
function scriptOfSample(sample, scripts) {
    let code = sample.codePointAt(0)
    for (let script of scripts) {
        for (let range of script.ranges) {
            if (code >= range[0] && code <= range[1]) {
                return script.name
            }
        }
    }
    return "unknown"
}

function scriptOfString(sample, scripts) {
    /**
     * @type {array} chars
     */
    let chars = Array.from(sample)
    return chars.reduce(function(arr, char){
        arr[scriptOfSample(char, SCRIPTS)] = ++arr[scriptOfSample(char, SCRIPTS)] || 1
        return arr
    }, {})
}
 