"use strict";
/**
 * A 2D-array representing the board
 */
let board = [];

/**
 * The current turn
 */
let turn = 0;

/**
 * Setup board arrays and event listeners
 */
window.addEventListener("load", () => {
    let cell = document.querySelector("#board div");
    for (let index = 0; index < 8; index++) {
        document.getElementById("board").appendChild(cell.cloneNode(true));
    }

    let cells = Array.from(document.querySelectorAll("#board div"));
    board.push(cells.slice(0, 3));
    board.push(cells.slice(3, 6));
    board.push(cells.slice(6, 9));

    createEvents();

    document.getElementById("reset").addEventListener("pointerup", reset);
});

/**
 * Computes the move that was just made
 * @param {Event} event The source of the event
 */
function move(event) {
    // Handle click event
    let element = event.currentTarget;
    element.children[turn % 2].classList.add("set");
    element.removeEventListener("pointerup", move);
    element.removeEventListener("pointerenter", hover);
    element.removeEventListener("pointerleave", unhover);
    
    let x;
    let y;
    
    // Determine clicked coordinate
    for (let index = 0; index < board.length; index++) {
        y = index;
        x = board[index].indexOf(element);
        if (x == -1) {
            continue;
        }
        break;
    }
    
    // Determine winner
    if (getWinner(x, y)) {
        removeEvents();
        return;
    }

    turn++;
}

/**
 * Provides hover behavior
 * @param {Event} event The source of the event
 */
function hover(event) {
    event.currentTarget.children[turn % 2].classList.add("hover");
}

/**
 * Provides unhover behavior
 * @param {Event} event The source of the event
 */
function unhover(event) {
    event.currentTarget.children[turn % 2].classList.remove("hover");
}

/**
 * Checks if the current player has won the game and displays the winner
 * @param {Number} x The x-coordinate
 * @param {Number} y The y-coordinate
 * @returns True if the current player has won
 */
function getWinner(x, y) {
    // Check column
    if (board.every(row => row[x].children[turn % 2].classList.contains("set"))) {
        document.getElementById("ver-" + x).classList.add("winner");
        return true;
    }
    
    // Check row
    if (board[y].every(column => column.children[turn % 2].classList.contains("set"))) {
        document.getElementById("hoz-" + y).classList.add("winner");
        return true;
    }

    // Check backward diagonal
    if (checkCell(0,0) && checkCell(1,1) && checkCell(2,2)) {
        document.getElementById("dia-0").classList.add("winner");
        return true;
    }
    
    // Check forward diagonal
    if (checkCell(0,2) && checkCell(1,1)  && checkCell(2,0)) {
        document.getElementById("dia-1").classList.add("winner");
        return true;
    }

    return false;
}

/**
 * Checks if the current players has marked the given cell
 * @param {Number} x The x-coordinate
 * @param {Number} y The y-coordinate
 * @returns True if the current players has a mark on the given cell
 */
function checkCell(x, y) {
    return board[y][x].children[turn % 2].classList.contains("set");
}

/**
 * Adds event listeners to all cells
 */
function createEvents() {
    board.forEach(row => row.forEach(cell => {
        cell.addEventListener("pointerup", move);
        cell.addEventListener("pointerenter", hover);
        cell.addEventListener("pointerleave", unhover);
    }));
}

/**
 * Removes event listeners from all cells
 */
function removeEvents() {
    board.forEach(row => row.forEach(cell => {
        cell.removeEventListener("pointerup", move);
        cell.removeEventListener("pointerenter", hover);
        cell.removeEventListener("pointerleave", unhover);
    }));
}

/**
 * Resets the board
 */
function reset() {
    turn = 0;
    board.forEach(row => {
        row.forEach(cell => {
            Array.from(cell.children).forEach(element => {
                element.className = "";
            });
        });
    });

    Array.from(document.getElementById("lines").children).forEach(element => element.className = "");

    createEvents();
}