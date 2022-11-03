import {get} from "https"

const url = "https://wttr.in/$?format=j1"
/**
 * 
 * @param {string} location 
 */
function currentTemp(location) {
    if (typeof location !== "string") {
        console.log("Invalid input")
        return
    }
    get(url.replace("$", location), res => {
        res.setEncoding("utf-8")
        let rawData = ''
        res.on('data', chunk => rawData += chunk)
        res.on('end', () => {
            const parsed = JSON.parse(rawData)
            console.log(parsed.current_condition[0].temp_C + "° C")
        })
    })
}

if (process.argv.length >= 3) {
    currentTemp(process.argv[2])
}