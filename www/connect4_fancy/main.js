import * as model from "./model.js"

export const config = {
    cell_dim: 100,
    pad: 20,
    rows: 7,
    columns: 7,
    placement_elem: "free",
    puck_disabled: "disabled",
    puck_class: "puck",
    red: "red",
    blue: "blue"
}

export let currentPuck
let insertCells


window.addEventListener("load", () => {
    config.placement_elem = document.getElementById(config.placement_elem)
    insertCells = Array.from(document.querySelectorAll("#insert-row > *"))
    model.reset()

    enablePreview()
})

export function setCurrentPuck(puck) {
    currentPuck = puck
}


/**
 * Displays a hovering animation at the apporpriate position
 * @param {Event} event The event
 */
function hoverCell(column) {
    return (event) => {
        currentPuck.place(0, column)
    }
}

function clickCell(column) {
    return (event) => {
        model.insertAt(column)

    }
}

function enablePreview() {
    insertCells.forEach((cell, i) => {
        let hover = hoverCell(i)
        cell.hover = hover
        cell.addEventListener("pointerenter", hover)
        let click = clickCell(i) 
        cell.click = click
        cell.addEventListener("pointerdown", click)
        console.log(cell.hover)
    });
}

function disablePreview() {
    insertCells.forEach(cell => {
        cell.removeEventListener("pointerenter", cell.hover)
        cell.removeEventListener("pointerdown", cell.click)
    })
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}