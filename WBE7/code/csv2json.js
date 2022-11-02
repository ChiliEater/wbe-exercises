import * as fs from "fs/promises"
import { existsSync } from "fs"
import * as readline from "readline/promises"
import { Console } from "console"

const start = process.hrtime.bigint()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const inputPath = process.argv[2]
const outputPath = process.argv[3]
const info = await fs.stat(inputPath)
const file = await fs.readFile(inputPath, "utf8")

if (process.argv.length < 4) {
    console.log("Usage: node csv2json.csv output.json")
    process.exit()
}

function ask() {
    return new Promise((resolve, reject) => {
        rl.question("Output file exists. Overwrite? [y/n] Default: n", (answer) => {
            resolve(answer)
        })
    })
}
console.log(`==== ${inputPath.split("/").at(-1)} ====`)
console.log(`Path: ${inputPath}`)
console.log(`Size: ${info.size} Bytes`)
console.log(`Last modified: ${info.mtime}`)

const lines = file.split("\n")
const labels = lines[0].trim().split(",")
let out = []

for (let index = 1; index < lines.length; index++) {
    let line = lines[index];
    let obj = {}
    line.trim().split(",").forEach((cell, index) => {
        obj[labels[index]] = cell
    });
    out.push(obj)
}

const end = process.hrtime.bigint()

console.log(`Took ${end - start} nanoseconds to process`)

if (await existsSync(outputPath)) {
    const answer = await rl.question("Output file exists. Overwrite? [y/n] Default: n\n")
    if (answer.toLowerCase() != 'y') {
        console.log("Aborting.")
        process.exit()
    }
}

await fs.writeFile(outputPath, JSON.stringify(out, null, 4))
process.exit()