'use strict'
import { Chip } from "./model.js"


export class BoardBuilder {
    constructor() {}

    empty() {
        return new Board(0, 0)
    }

    fromSize(x, y) {
        return new Board(x, y)
    }

    /**
     * Creates a Board from a pre-existing board array
     * @param {array} board Pre-existing board
     * @returns The new Board object
     */
    fromArray(board) {
        let newBoard = new Board(board[0].length, board.length)
        board.flat().filter(slot => !!slot).forEach(chip => newBoard.setChip(chip.clone(), chip.column, chip.row))
        return newBoard
    }

    fromBoard(board) {
        return this.fromArray(board.board)
    }

    fromObject(obj) {
        return this.empty().fromObject(obj)
    }
}

class Board {
    #board
    #width
    #height

    constructor(width, height) {
        this.#height = height
        this.#width = width

        this.#board = []
        for (let i = 0; i < width - 1; i++) {
            this.#board.push(Array(width))
        }
    }

    setChip(chip, x, y) {
        this.#board[y][x] = chip
    }

    getChip(x, y) {
        return this.#board[y][x]
    }

    get width() {
        return this.#width
    }

    get height() {
        return this.#height
    }

    get board() {
        let newBoard = []
        this.#board.forEach(row => {
            newBoard.push(row.map(chip => chip.clone()))
        })
        return newBoard
    }

    /**
     * Searches the given column and returns the first empty row from the bottom
     * @param {Number} column The column that should be searched
     * @returns The empty row
     */
    findFreeRow(column) {
        for (let i = this.#height - 1; i > -1; i--) {
            if (this.#board[i][column] === undefined) {
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
    checkWinner(chip) {
        let winner = false

        for (let y = 0; y < this.#board.length; y++) {
            const row = this.#board[y]
            for (let x = 0; x < row.length; x++) {
                const slot = row[x]
                if (chip.sameTeam(slot)) {
                    winner =
                        this.#checkDirection(chip, y, x, 1, 0) ||
                        this.#checkDirection(chip, y, x, -1, 0) ||
                        this.#checkDirection(chip, y, x, 0, 1) ||
                        this.#checkDirection(chip, y, x, 0, -1) ||
                        this.#checkDirection(chip, y, x, 1, 1) ||
                        this.#checkDirection(chip, y, x, -1, -1) ||
                        this.#checkDirection(chip, y, x, -1, 1) ||
                        this.#checkDirection(chip, y, x, 1, -1)
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
    #checkDirection(check, row, column, rowDelta, columnDelta) {
        const chip = check
        let match = false
        let matches = 0

        while (
            row < this.#height &&
            row >= 0 &&
            column < this.#width &&
            column >= 0
        ) {
            let test = this.#board[row][column]
            if (!chip.sameTeam(test) && match) {
                break
            } else if (chip.sameTeam(test)) {
                match = true
                matches++
            }
            row += rowDelta
            column += columnDelta
        }
        return matches === 4
    }

    toJSON() {
        return {
            board: this.#board,
            width: this.#width,
            height: this.#height
        }
    }

    fromObject(obj) {
        this.#width = obj.width
        this.#height = obj.height
        let newBoard = obj.board
        obj.board.flat().filter(slot => !!slot).forEach(chip => {
            let newChip = new Chip().fromObject(chip)
            newBoard[newChip.row][newChip.column] = newChip
        })
        return this
    }
}
