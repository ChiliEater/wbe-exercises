"use strict"
import * as model from "./model.js"

/**
 * The element containing the visual chips
 */
const COLUMNS = document.querySelectorAll("#board > div:not(#free")

const RESET_BTN = document.querySelector("#button-container > button")

/**
 * Creates a decorated function that places a chip at the specified column
 * @param {number} column The column to inser at
 * @returns Decorated function with a fixed colum
 */
const wrappedInsert = (column) => () => model.insertAt(column)

/**
 * Sets up all necessary event listeners for the game
 */
export function setup() {
    Array.from(COLUMNS).forEach((element, i) => {
        let decorated = wrappedInsert(i)
        element.addEventListener("pointerup", decorated)
    });

    RESET_BTN.addEventListener("pointerup", (event) => {
        event.preventDefault()
        model.reset()
    })
}
