const config = {
    rows: 6,
    columns: 7,
    placement_elem: "free",
    red: "red",
    blue: "blue",
    x_offset: "x-offset-",
    y_offset: "y-offset-",
}

let testBoard = [ 
    [ '_', '_', '_', '_', '_', '_', '_' ], 
    [ '_', '_', '_', '_', '_', '_', '_' ], 
    [ '_', '_', '_', '_', 'r', '_', '_' ], 
    [ '_', '_', '_', 'r', 'r', 'b', 'b' ], 
    [ '_', '_', 'r', 'b', 'r', 'r', 'b' ], 
    [ 'b', 'r', 'b', 'r', 'b', 'b', 'b' ] 
]

function connect4Winner(color, board) {
    let winner = false
    let skip = false
    board.forEach((row, y) => row.forEach((slot, x) => {
        if (skip) {
            return
        }
        if (slot === color) {
            winner = (
                checkDirection(board, color, y, x,  1,  0) ||
                checkDirection(board, color, y, x, -1,  0) ||
                checkDirection(board, color, y, x,  0,  1) ||
                checkDirection(board, color, y, x,  0, -1) ||
                checkDirection(board, color, y, x,  1,  1) ||
                checkDirection(board, color, y, x, -1, -1) ||
                checkDirection(board, color, y, x, -1,  1) ||
                checkDirection(board, color, y, x,  1, -1)
            )
            skip = winner
        }
    }))
    return winner
}


function checkDirection(board, check, row, column, rowDelta, columnDelta) {
    const color = check
    let match = false
    let matches = 0

    while (row < config.rows && row >= 0 && column < config.columns && column >= 0) {
        let test = board[row][column]
        if (test !== color && match) {
            break;
        } else if (test === check) {
            match = true
            matches++
        }
        row += rowDelta
        column += columnDelta
    }
    return matches === 4
}

console.log(connect4Winner('r', testBoard))

module.exports = { connect4Winner }