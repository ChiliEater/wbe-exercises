import * as main from "./main.js"

const PLACEMENT_ELEM = document.querySelector("#free")

/**
 * Draws the current board based on the given array
 * @param {array} board The current board array
 */
export function draw(board) {
    PLACEMENT_ELEM.innerHTML = ""
    board.forEach((row) => row.forEach((cell) => {
        if (!!cell) {
            let chip = document.createElement("DIV")
            chip.classList.add(
                main.config.x_offset + cell.column,
                main.config.y_offset + cell.row,
                cell.color
            )
            PLACEMENT_ELEM.appendChild(chip)
        }
    }))
}