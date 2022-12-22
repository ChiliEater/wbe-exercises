"use strict"
import * as model from "./model.js"
import * as renderer from "./renderer.js"
import * as events from "./events.js"

let game

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
    game = new model.Game(renderer)
    events.setup(game)
})