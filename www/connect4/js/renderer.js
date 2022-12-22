"use strict"
import * as main from "./main.js"

const PLACEMENT_ELEM = document.querySelector("#free")
const TURN_INDICATOR = document.querySelector("#turn-indicator")
const BOARD = document.querySelector("#board")
const COLUMNS = Array.from(document.querySelectorAll("#board > div:not(#free)"))
const BORDER_CLASS = "border-"

/**
 * Draws the current board based on the given array
 * @param {array} board The current board array
 */
export function draw(board, color) {
    PLACEMENT_ELEM.innerHTML = ""
    new Array().concat(...board).filter(slot => !!slot).forEach((cell) => {
        let chip = document.createElement("DIV")
        PLACEMENT_ELEM.appendChild(chip)
        chip.classList.add(
            main.config.x_offset + cell.column,
            main.config.y_offset + cell.row,
            cell.color
        )
    })

    TURN_INDICATOR.className = ""
    TURN_INDICATOR.classList.add(color)
}

/**
 * Displays the specified winner on screen
 * @param {string} color The winning color
 */
export function announceWinner(color) {
    let elements = Array.from(COLUMNS)
    elements.push(BOARD)
    elements.forEach(element => {
        element.classList.add(BORDER_CLASS + color)
    })
}

/**
 * Removes the winner announcement from the screen
 */
export function unannounceWinner() {
    let elements = Array.from(COLUMNS)
    elements.push(BOARD)
    elements.forEach(element => {
        element.className = ""
    })
}