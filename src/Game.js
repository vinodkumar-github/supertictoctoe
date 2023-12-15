import React, {useEffect, useState} from 'react';
import './Game.css';
import UnitSquare from './UnitSquare';


function createULT(n, mat, setMatrix,turnX, setTurnX, progress, setProgress, gameOver) {
  
  const gCol = [];
  for (let i = 0; i < n; i++) {
    const gRow = [];
    for (let j = 0; j < n; j++) {
      gRow.push(<div key={`Row-${i}-${j}`} id={`Row-${i}-${j}`}className='mainRow'><UnitSquare key={`${i}-${j}`}  n= {n} i={i} j={j} mat={mat} setMatrix={setMatrix} turnX={turnX} setTurnX={setTurnX} progress ={progress} setProgress={setProgress} gameOver={gameOver}/></div>);
    }
    gCol.push(<div key = {`Col-${i}`} id={`Col-${i}`} className='mainCol'>{gRow}</div>);
  }
  return gCol; 
}
function createMatrix(n) {
  const newMatrix = [];

  for (let i = 0; i < n; i++) {
    const inner1 = [];
    for (let j = 0; j < n; j++) {
      const inner2 = [];
      for (let k = 0; k < n; k++) {
        const inner3 = [];
        for (let l = 0; l < n; l++) {
          inner3.push(`${i}-${j}-${k}-${l}`);
        }
        inner2.push(inner3);
      }
      inner1.push(inner2);
    }
    newMatrix.push(inner1);
  }

  return newMatrix;
}

function createFilledMatrix(n,c) {
  let newMatrix = [];

  for (let i = 0; i < n; i++) {
    const inner1 = [];
    for (let j = 0; j < n; j++) {
      const inner2 = [];
      for (let k = 0; k < n; k++) {
        const inner3 = [];
        for (let l = 0; l < n; l++) {
          inner3.push(c);
        }
        inner2.push(inner3);
      }
      inner1.push(inner2);
    }
    newMatrix.push(inner1);
  }

  return newMatrix;
}






function Game({gameData}) {
  const n = gameData.grid;
  const Matrix = createMatrix(n);
  const [matrix, setMatrix] = useState(Matrix);
  const turnXinit = [true, '','']
  const [progress, setProgress] = useState(['']);
  const[turnX, setTurnX] = useState(turnXinit);
  const [gameWins, setGameWins] = useState(() => createFilledMatrix(n,''));
  const [gameOver, setGameOver] = useState([false, '']);
 
  function hasWon(matrix, c) {
    const isHorizontalWin = matrix.some(row => row.every(cell => cell === c));
    const isDiagonal1Win = matrix.every((row, index) => row[index] === c);
    const isDiagonal2Win = matrix.every((row, index) => row[matrix.length - 1 - index] === c);
  
    const isVerticalWin = [...matrix.keys()].some(p => matrix.every(row => row[p] === c));
  
    return isHorizontalWin || isVerticalWin || isDiagonal1Win || isDiagonal2Win;
  }
  useEffect(() => {
    setGameWins(prevGameWins => {
      const updatedGameWins = [...prevGameWins]; 
      progress.forEach(cell => {
        if (cell !== '') {
          const [row, col, value] = cell.split('-');
        if (updatedGameWins[row]) {
            updatedGameWins[row][col] = value;
        }
        }
      });
      return updatedGameWins;
    }
    );
  }, [progress]);
  
  useEffect (() => {
   if (hasWon(gameWins, 'X')) {
   
    setGameOver([true,'X'])
   }
   else if (hasWon(gameWins, 'O')) {
   
    setGameOver([true,'O'])
   }
   else if (gameWins.every(row => row.every(cell => cell === 'X' || cell === 'O')) && gameWins.some(row => row.some(cell => cell === 'X' )) && gameWins.some(row => row.some(cell => cell === 'O' ))){
    setGameOver([true,'D'])
   }
  },[gameWins])


 
  

   return (
    <>
    <div className='super'>
    <div className='GamePlayers'>
            <p className='GameP1' id='GameP1' style={(turnX[0]===true)?{backgroundColor:'slateblue', color:'white', fontWeight:'bolder',fontSize:'Large'}:{backgroundColor:'white'}} >Player 1: {gameData.player1.toUpperCase()} <br/>(X)</p>
            <p className='GameP2' id = 'GameP2' style={(turnX[0]===false)?{backgroundColor:'orange',color:'black',fontWeight:'bolder',fontSize:'Large'}:{backgroundColor:'white'}}>Player 2: {gameData.player2.toUpperCase()} <br/>(O)</p>
         
    </div>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
  { gameOver[0] && gameOver[1] === 'X' ?
    <div style={{ color: 'slateblue', fontStyle: 'italic', fontSize: 'xx-large', fontWeight: 'bolder', textAlign: 'center' }}>
      <p style={{ color: 'black', fontStyle: 'normal' }}>Game is over</p>
      <p>{gameData.player1} won the match</p>
    </div>
    :
    gameOver[0] && gameOver[1] === 'O' ?
      <div style={{ color: 'orange', fontStyle: 'italic', fontSize: 'xx-large', fontWeight: 'bolder', textAlign: 'center' }}>
        <p style={{ color: 'black', fontStyle: 'normal' }}>Game is over</p>
        <p>{gameData.player2} won the match</p>
      </div>
      :
      gameOver[0] && gameOver[1] === 'D' ?
        <div style={{ color: 'black', fontStyle: 'italic', fontSize: 'xx-large', fontWeight: 'bolder', textAlign: 'center' }}>
          <p style={{ color: 'black', fontStyle: 'normal' }}>Game is over</p>
          <p>It was a draw</p>
        </div>
        :
        null
  }
</div>

    
    
      <div className='superColumn'>
      <div className='superColumn1'>
      
        {createULT(n, matrix, setMatrix, turnX, setTurnX, progress, setProgress,gameOver)}
        </div>
      </div>
    </div>
    </>
  );
}

export default Game;
