"use strict"
import * as main from "./main.js"
import * as renderer from "./renderer.js"

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

export let turn = 0

/**
 * @type {Array}
 */
let board

/**
 * Resets the board to a neutral state
 */
export async function reset() {
    board = Array(main.config.rows)
    for (let i = 0; i < board.length; i++) {
        board[i] = Array(main.config.columns)
    }

    turn = 0
    renderer.draw(Array.from(board))
}

/**
 * Inserts the current puck at the given column and prepares the next turn
 * @param {Number} column The column
 */
export async function insertAt(column) {
    let row = findFreeRow(column)

    if (row >= main.config.rows || row < 0) {
        return
    }

    let chip = new Chip(getColor(), row, column)
    board[row][column] = chip

    if (checkWinner()) {
        return
    }
    turn++
    renderer.draw(Array.from(board))
}

/**
 * Returns the correct color based on the current turn
 * @returns A color
 */
export function getColor() {
    return turn % 2 == 0 ? "red" : "blue"
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

function checkWinner() {
    return false
}