module.exports = { findTag }

const regex = /<([^ <>]*?)>/

function findTag(input) {
    const match = input.match(regex)
    return match === null ? undefined : match[1]
}