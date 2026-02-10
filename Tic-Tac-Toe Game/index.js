// Referencing Variables //
const tiles = document.querySelectorAll(".tile");
const resetBtn = document.getElementById("reset");
const info = document.getElementById("info");
info.textContent = "Next Turn: X";

// Declaring Game States //
let currentPlayer = true;
let winnerFound = false;

// Tracking Board + Declaring Winning Combinations //
let board = ["", "", "", "", "", "", "", "", ""];
const winningCombos = [     
    // Row Combinations //
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Column Combinations //
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonal Combinations //
    [0, 4, 8],
    [2, 4, 6]
]

// Creating Click Event Handler //
function clickHandler(event){
    // Grabbing the tile + index //
    const tile = event.target;
    const index = tile.dataset.index;
    
    // Exit function if there is a winner or tile is already occupied //
    if (winnerFound || board[index] !== "") { return; } 

    const currentMove = currentPlayer ? "X" : "O"; // Deciding current player
    
    // Updating board state and UI //
    board[index] = currentMove;
    tile.textContent = currentMove;
    
    // Checking winning combinations (updates 'winnerFound' if a match is detected) //
    winningCombos.forEach((combo) => {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]){
            winnerFound = true;
            info.textContent = `Player ${board[a]} Won!`;
        }
    });
    
    // Checking if it's a draw (no moves left and no winner) //
    const isDraw = !winnerFound && board.every(cell => cell !== ""); 
    
    // Updating UI for Draw or next turn //
    if(isDraw){
        info.textContent = "Game Draw";
        winnerFound = true; // Prevents further moves
    } else if (!winnerFound) {
        currentPlayer = !currentPlayer;
        info.textContent = currentPlayer ? "Next Turn: X" : "Next Turn: O";
    }

    // Applying 'popup_animation' for visual feedback //
    info.classList.add("popup_animation");
    setTimeout(() => {
        info.classList.remove("popup_animation");
    }, 150);
}

// Adding Click Event To Each Tile //
tiles.forEach(tile => {
    tile.addEventListener("click", clickHandler);
})

// Resetting the game to its default state //
resetBtn.addEventListener("click", () => {
    currentPlayer = true;
    winnerFound = false;
    board = ["", "", "", "", "", "", "", "", ""];
    
    tiles.forEach(tile => {
        tile.textContent = "";
    })

    info.textContent = "Next Turn: X";
    info.classList.add("popup_animation");
    setTimeout(() => {
        info.classList.remove("popup_animation");
    }, 150);
})
