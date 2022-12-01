"use strict"
import * as model from "./model.js"
import * as events from "./events.js"

/**
 * A simple object containing some useful information about the game
 */
export const config = {
    rows: 6,
    columns: 7,
    placement_elem: "free",
    red: "red",
    blue: "blue",
    x_offset: "x-offset-",
    y_offset: "y-offset-",
}

window.addEventListener("load", () => {
    model.reset()
    events.setup()
})