"use strict"
import * as main from "./main.js"

class Puck {

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
        this.#element = document.createElement("div")
        this.#color = color
        this.#row = row
        this.#column = column

        this.element.classList.add(main.config.puck_class, color, main.config.puck_disabled)
        main.config.placement_elem.appendChild(this.element)
    }

    place(row, column) {
        this.element.style.marginTop = `${row * main.config.cell_dim + main.config.pad / 2}px`
        this.element.style.marginLeft = `${column * main.config.cell_dim + main.config.pad / 2}px`
    }

    show() {
        this.element.classList.remove(main.config.puck_disabled)
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

    get element(){
        return this.#element
    }
}

export let turn = 0
let board

export async function reset() {
    board = Array(main.config.rows)
    for (let i = 0; i < board.length; i++) {
        board[i] = Array(main.config.columns)
    }

    main.config.placement_elem.innerHTML = ""
    turn = 0
    main.setCurrentPuck(new Puck(getColor(), 0, 0))
    board[0][0] = main.currentPuck
    console.log(board)
    await main.sleep(200)
    board[0][0].show()
}

/**
 * Inserts the current puck at the given column and prepares the next turn
 * @param {Number} column The column
 */
export async function insertAt(column) {
    let row = findFreeRow(column)
    let puck = board[0][0]
    board[row][column] = puck
    puck.place(row, column)

    if (checkWinner()) {
        return
    }
    turn++
    main.setCurrentPuck(new Puck(getColor(), 0, 0))
    await main.sleep(200)
    board[0][0] = main.currentPuck
    main.currentPuck.show()

    console.log(board)
}

/**
 * Returns the correct color based on the current turn
 * @returns A color
 */
function getColor() {
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
}

function checkWinner() {
    return false
}