"use strict"
import * as main from "./main.js"
import * as renderer from "./renderer.js"

/**
 * This class represents all relevant information that encompasses a chip in the board
 */
class Chip {

    /**
     * @type {string}
     */
    #color

    /**
     * @type {number}
     */
    #row

    /**
     * @type {number}
     */
    #column

    /**
     * @type {HTMLElement}
     */
    #element

    constructor(color, row, column) {
        this.#color = color
        this.#row = row
        this.#column = column
    }

    /**
     * Checks if this chip is equal to the given chip
     * @param {Chip} chip The chip
     * @returns Equality of to chips
     */
    equals(chip) {
        if (!chip) {
            return false
        }
        return (
            this.color === chip.color &&
            this.column === chip.column &&
            this.row === chip.row
        )
    }

    /**
     * Checks if the given chip is on the same team
     * @param {Chip} chip The chip
     * @returns If both chips are on the same team
     */
    sameTeam(chip) {
        if (!chip) {
            return false
        }
        return this.color === chip.color
    }

    get color(){
        return this.#color
    }

    get row(){
        return this.#row
    }

    get column(){
        return this.#column
    }
}

/**
 * The current turn
 */
export let turn = 0

/**
 * @type {Array}
 */
let board

/**
 * The current win state
 */
let won = false

/**
 * Resets the board to a neutral state
 */
export async function reset() {
    board = Array(main.config.rows)
    for (let i = 0; i < board.length; i++) {
        board[i] = Array(main.config.columns)
    }

    turn = 0
    won = false
    renderer.unannounceWinner()
    renderer.draw(Array.from(board))
}

/**
 * Inserts the current puck at the given column and prepares the next turn
 * @param {Number} column The column
 */
export async function insertAt(column) {
    let row = findFreeRow(column)

    if (row >= main.config.rows || row < 0 || won) {
        return
    }

    let chip = new Chip(getColor(), row, column)
    board[row][column] = chip

    turn++
    renderer.draw(Array.from(board))

    if (checkWinner(chip)) {
        won = true
        turn++
        renderer.draw(Array.from(board))
        renderer.announceWinner(chip.color)
    }
}

/**
 * Returns the correct color based on the current turn
 * @returns A color
 */
export function getColor() {
    return turn % 2 == 0 ? main.config.red : main.config.blue
}

/**
 * Searches the given column and returns the first empty row from the bottom
 * @param {Number} column The column that should be searched
 * @returns The empty row
 */
function findFreeRow(column) {
    for (let i = main.config.rows - 1; i > -1; i--) {
        if (board[i][column] === undefined) {
            return i
        }
    }
    return -1
}

/**
 * Takes a chip and checks the board for win conditions
 * @param {Chip} chip The chip to compare to
 * @returns Whether the player of the given chip won
 */
function checkWinner(chip) {
    let winner = false

    for (let y = 0; y < board.length; y++) {
        const row = board[y];
        for (let x = 0; x < row.length; x++) {
            const slot = row[x];
            if (chip.sameTeam(slot)) {
                winner = (
                    checkDirection(chip, y, x,  1,  0) ||
                    checkDirection(chip, y, x, -1,  0) ||
                    checkDirection(chip, y, x,  0,  1) ||
                    checkDirection(chip, y, x,  0, -1) ||
                    checkDirection(chip, y, x,  1,  1) ||
                    checkDirection(chip, y, x, -1, -1) ||
                    checkDirection(chip, y, x, -1,  1) ||
                    checkDirection(chip, y, x,  1, -1)
                )
                if (winner) {
                    return winner
                }
            }
        }
    }
    return false
}

/**
 * Checks if the a color has won in the given direction from the specified starting point
 * @param {Chip} check The chip to compare with
 * @param {number} row Row
 * @param {number} column Column
 * @param {number} rowDelta Row direction
 * @param {number} columnDelta Column direction
 * @returns If the color has won in this direction
 */
function checkDirection(check, row, column, rowDelta, columnDelta) {
    const chip = check
    let match = false
    let matches = 0

    while (row < main.config.rows && row >= 0 && column < main.config.columns && column >= 0) {
        let test = board[row][column]
        if (!chip.sameTeam(test) && match) {
            break;
        } else if (chip.sameTeam(test)) {
            match = true
            matches++
        }
        row += rowDelta
        column += columnDelta
    }
    return matches === 4
}