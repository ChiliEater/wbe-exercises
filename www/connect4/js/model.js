'use strict'
import { BoardBuilder } from './boardBuilder.js'
import * as main from './main.js'

/**
 * This class represents all relevant information that encompasses a chip in the board
 */
export class Chip {
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

    clone() {
        return new Chip(this.#color, this.#row, this.#column)
    }

    toJSON() {
        return {
            color: this.#color,
            row: this.#row,
            column: this.#column
        }
    }

    fromObject(obj) {
        this.#color = obj.color
        this.#row = obj.row
        this.#column = obj.column
        return this
    }

    get color() {
        return this.#color
    }

    get row() {
        return this.#row
    }

    get column() {
        return this.#column
    }
}

export class Game {
    #turn = 0
    /**
     * @type {Board}
     */
    #board
    #won = false
    /**
     * @type {renderer}
     */
    #renderer

    #undoStack = []

    constructor(renderer) {
        this.#renderer = renderer
        this.reset()
    }

    /**
     * Resets the board to a neutral state
     */
    reset() {
        this.#board = new BoardBuilder().fromSize(main.config.columns, main.config.rows)
        this.#turn = 0
        this.#won = false
        this.#undoStack = []
        this.#renderer.unannounceWinner()
        this.#renderer.draw(this.#board.board, this.getColor())
    }

    /**
     * Inserts the current puck at the given column and prepares the next turn
     * @param {Number} column The column
     */
    insertAt(column) {
        let row = this.#board.findFreeRow(column)

        if (row >= main.config.rows || row < 0 || this.#won) {
            return
        }

        this.#do()

        let chip = new Chip(this.getColor(), row, column)
        this.#board.setChip(chip, column, row)


        this.#turn++
        this.#renderer.draw(this.#board.board, this.getColor())

        if (this.#board.checkWinner(chip)) {
            this.#won = true
            this.#turn++
            this.#renderer.draw(this.#board.board, this.getColor())
            this.#renderer.announceWinner(chip.color)
            this.#turn--
        }
    }

    /**
     * Returns the correct color based on the current turn
     * @returns A color
     */
    getColor() {
        return this.#turn % 2 == 0 ? main.config.red : main.config.blue
    }

    #do() {
        this.#undoStack.push(new BoardBuilder().fromBoard(this.#board))
    }

    undo() {
        if (this.#undoStack.length > 0) {
            this.#board = this.#undoStack.pop()
            this.#turn--
            this.#won = false
            this.#renderer.unannounceWinner()
            this.#renderer.draw(this.#board.board, this.getColor())
        }
    }

    toJSON() {
        return {
            turn: this.#turn,
            won: this.#won,
            board: this.#board.freeze(),
            undoStack: this.#undoStack
        }
    }

    fromObject(obj) {
        this.#turn = obj.turn
        this.#won = obj.won
        let builder = new BoardBuilder()
        this.#board = builder.fromObject(obj)
        this.#undoStack = obj.undoStack.map(state => builder.fromObject(state))
    }
}
