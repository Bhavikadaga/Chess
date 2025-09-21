const socket = io(); //sends request to backend, this will runn io.on()
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

let dragggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () =>{
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowindex) => {
        row.forEach((square, squareindex) =>{
            const squareElement = document.createElement("div");
            squareElement.classList.add("square", 
                (rowindex + squareindex)%2 === 0? "light" : "dark"
            );

            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = squareindex;

            if(square){
                const pieceElement = document.createElement("div");
                pieceElement.classList.add("piece", square.color === "w" ? "white" : "black");
                pieceElement.innerText = getPieceUniCode(square);
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e) =>{
                    if(pieceElement.draggable){
                        dragggedPiece = pieceElement;
                        sourceSquare = {row: rowindex, col:squareindex};
                        e.dataTransfer.setData("text/plain", "");
                    }
                });

                pieceElement.addEventListener("dragend", (e) =>{
                    dragggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener("dragover", (e) =>{
                e.preventDefault();
            });

            squareElement.addEventListener("drop", (e) =>{
                e.preventDefault();
                if(dragggedPiece){
                    const targetedSource = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col)
                    };

                    handleMove(sourceSquare, targetedSource);
                }
            });
            
            boardElement.appendChild(squareElement);
        });

    });
}

const handleMove = () =>{
    const move ={
        from: "",
        to: "",
        promotion: 'q'
    }
}

const getPieceUniCode = (piece) => {
   const unicodePieces = {
      K: "♔",  
      Q: "♕",
      R: "♖",
      B: "♗",
      N: "♘",
      P: "♙",
      k: "♚", 
      q: "♛",
      r: "♜",
      b: "♝",
      n: "♞",
      p: "♟"
   };
   return unicodePieces[piece.type] || "";
};

renderBoard();