"use strict"

const COLUMNS = document.querySelectorAll("#board > div:not(#free")
const RESET_BTN = document.querySelector("#reset-button")
const UNDO_BTN = document.querySelector("#undo-button")
const SAVE_BTN = document.querySelector("#save-button")
const LOAD_BTN = document.querySelector("#load-button")
const CLEAR_BTN = document.querySelector("#clear-button")

/**
 * Creates a decorated function that places a chip at the specified column
 * @param {number} column The column to inser at
 * @returns Decorated function with a fixed colum
 */
const wrappedInsert = (column) => () => model.insertAt(column)

let model

/**
 * Sets up all necessary event listeners for the game
 */
export function setup(game) {
    model = game
    setupBoardEvents();
    setupButtonEvents();
}

function setupBoardEvents() {
    Array.from(COLUMNS).forEach((element, i) => {
        let decorated = wrappedInsert(i)
        element.addEventListener("pointerup", decorated)
    })
}

function setupButtonEvents() {
    RESET_BTN.addEventListener("pointerup", (event) => {
        event.preventDefault()
        model.reset()
    })

    UNDO_BTN.addEventListener("pointerup", (event) => {
        event.preventDefault()
        model.undo()
    })

    SAVE_BTN.addEventListener("pointerup", (event) => {
        event.preventDefault()

    })

    LOAD_BTN.addEventListener("pointerup", (event) => {
        event.preventDefault()

    })

    CLEAR_BTN.addEventListener("pointerup", (event) => {
        event.preventDefault()

    })
}