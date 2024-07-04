import React, { useState, useRef } from 'react'

const TicTacToe = () => {
    const [board, setBoard] = useState(new Array(9).fill(0));
    const [activePlayer, setActivePlayer] = useState(1); // 1 or 2
    const movesRef = useRef({
        rows: new Array(3).fill(0),
        cols: new Array(3).fill(0),
        dig: 0,
        antiDig: 0,
    });

    const handlePlayerMove = (e) => {
        if(e.target?.id && board[e.target.id] === 0){
            // update board for UI
            let index = e.target.id;
            let newBoard = JSON.parse(JSON.stringify(board));
            newBoard[index] = activePlayer === 1 ? 1 : -1;
            setBoard(newBoard);

            // update moves for result
            let row = Math.floor(index / 3);
            let col = index % 3;

            movesRef.current.rows[row] += (activePlayer === 1 ? 1 : -1);
            movesRef.current.cols[col] += (activePlayer === 1 ? 1 : -1);
            if(row === col) movesRef.current.dig += (activePlayer === 1 ? 1 : -1);   
            if(row + col === 2) movesRef.current.antiDig += (activePlayer === 1 ? 1 : -1);

            // check for winner
            let valueForWin = activePlayer === 1 ? 3 : -3;
            if(
                movesRef.current.rows[row] === valueForWin ||
                movesRef.current.cols[col] === valueForWin ||
                movesRef.current.dig === valueForWin ||
                movesRef.current.antiDig === valueForWin
            ){
                // declare winner and prompt restart game
                setTimeout(() => {
                    alert(`Player ${activePlayer} won!! Restart Game?`);
                    initiateGame();
                }, 500);
            }
            else if(newBoard.indexOf(0) === -1){
                // declare tie
                setTimeout(() => {
                    alert(`Game ended in a tie!! Restart Game?`);
                    initiateGame();
                }, 500);
            }
            else{
                // switch player
                setActivePlayer(aPlayer => aPlayer === 1 ? 2 : 1);
            }
        }
    }

    const initiateGame = () => {
        setBoard(new Array(9).fill(0));
        setActivePlayer(1);
        movesRef.current = {
            rows: new Array(3).fill(0),
            cols: new Array(3).fill(0),
            dig: 0,
            antiDig: 0,
        }
    }

    return (
        <div className='flex justify-center items-center h-screen w-screen bg-[#f9f8f3]'>
            <div className='flex justify-evenly flex-wrap w-[300px] md:w-[600px] h-[300px] md:h-[600px] m-auto shadow' onClick={handlePlayerMove}>
                {
                    board.map((el, idx) => {
                        return (
                            <div data-testid="test-box" id={idx} className='w-[95px] md:w-[195px] h-[95px] md:h-[195px] border border-black bg-[#fff] flex justify-center items-center text-black text-[50px]' key={idx}>
                                {el === 1 ? "X" : el === -1 ? "O" : " "}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TicTacToe;