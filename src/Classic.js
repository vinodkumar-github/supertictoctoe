import React, { useState} from 'react';
import './Classic.css';
function createclassicMatrix(n) {
    const newCMatrix = [];
        for (let k = 0; k < n; k++) {
          const inner1 = [];
          for (let l = 0; l < n; l++) {
            inner1.push(`${k}-${l}`);
      }
      newCMatrix.push(inner1);
    }
  
    return newCMatrix;
  }

 function  createCFilledMatrix(n, a) {
    const newCFMatrix = [];
        for (let k = 0; k < n; k++) {
          const inner1 = [];
          for (let l = 0; l < n; l++) {
            inner1.push(a);
      }
      newCFMatrix.push(inner1);
    }
  
    return newCFMatrix;
  }

  function hasCWon(matrix, c) {
    const isHorizontalWin = matrix.some(row => row.every(cell => cell === c));
    const isDiagonal1Win = matrix.every((row, index) => row[index] === c);
    const isDiagonal2Win = matrix.every((row, index) => row[matrix.length - 1 - index] === c);
  
    const isVerticalWin = [...matrix.keys()].some(p => matrix.every(row => row[p] === c));
  
    return isHorizontalWin || isVerticalWin || isDiagonal1Win || isDiagonal2Win;
  }



function createGrid(nC, cmatrix, setCMatrix, cturnX, setCTurnX, xcmatriX, ocmatriX,cgameOver, setCGameOver) {
    const handleUnitCellClick = (e) => {
        const cellValue = e.target.id;
        const newArray = cellValue.split('-').length === 2 ? cellValue.split('-') : cellValue.split('-').length === 3 ? cellValue.split('-').slice(1): console.log(cellValue.split('-'));
    
        if (newArray) {
          const [a, b] = newArray;
          const nCMatrix = [...cmatrix];
    
          if (nCMatrix[a][b] !== 'X' && nCMatrix[a][b] !== 'O' && cturnX[0]) {
            nCMatrix[a][b] = 'X';
            setCMatrix(nCMatrix);
    
            if (hasCWon(nCMatrix, "X")) {
        
              setCGameOver([true, 'X']);
            } else {
              setCTurnX([false])
             
            }
          } 
        if (nCMatrix[a][b] !== 'X' && nCMatrix[a][b] !== 'O' && (!cturnX[0])) {
            nCMatrix[a][b] = 'O';
            setCMatrix(nCMatrix);
    
            if (hasCWon(nCMatrix, "O")) {
             
              setCGameOver([true, 'O']);
            } else {
              setCTurnX([true]);
            }
          }
        }
        if (hasCWon(cmatrix, 'X')) {
           
            setCGameOver([true,'X'])
           }
           else if (hasCWon(cmatrix, 'O')) {
          
            setCGameOver([true,'O'])
           }
           else if (cmatrix.every(row => row.every(cell => cell === 'X' || cell === 'O')) && cmatrix.some(row => row.some(cell => cell === 'X' )) && cmatrix.some(row => row.some(cell => cell === 'O' ))){
            setCGameOver([true,'D'])
           }
      };

  const cCol = [];
  for (let i = 0; i < nC; i++) {
    const cRow = [];
    for (let j = 0; j < nC; j++) {
      cRow.push(
        <div key={`CRow-${i}-${j}`} id={`1-${i}-${j}`} className='CRow' onClick={(e)=>handleUnitCellClick(e)} style={(cmatrix[i][j] === 'X') ? { backgroundColor: 'slateblue', color: 'white', fontSize: 'x-large' } : (cmatrix[i][j] === 'O') ? { backgroundColor: 'orange', color: 'black', fontSize: 'x-large' } : { backgroundColor: 'white' }}>
         <div key={`CCRow-${i}-${j}`} id={`0-${i}-${j}`} className='CCRow' onClick={(e)=>handleUnitCellClick(e)} > <p key={`c-${i}-${j}`}  id={`${i}-${j}`} name={`c-${i}-${j}`} className='eachCRow' onClick={(e)=>handleUnitCellClick(e)}  style={(cmatrix[i][j] === 'X' || cmatrix[i][j] === 'O') ? { display: 'flex', fontWeight: 'bolder' } : {display:'none'}}>{cmatrix[i][j]}</p> </div>
        </div>
      );
    }
    cCol.push(<div key={`CCol-${i}`} id={`CCol-${i}`} className='mainCol'>{cRow}</div>);
  };
  return <div key={`c${nC}`}>{cCol}</div>;
}




function Classic({gameData}) {
    const nC = gameData.grid;
    const classicMatrix = createclassicMatrix(nC);
    const [cmatrix, setCMatrix] = useState(classicMatrix);
    const cturnXinit = [true]
    const[cturnX, setCTurnX] = useState(cturnXinit);
    const [cgameOver, setCGameOver] = useState([false, '']);
    const xcmatriX = createCFilledMatrix(nC,'X');
    const ocmatriX = createCFilledMatrix(nC,'O')

    
    
  
     return (
      <div> 
      <div className='super'>
      <div className='GamePlayers'>
              <p className='GameP1' id='GameP1' style={(cturnX[0]===true)?{backgroundColor:'slateblue', color:'white', fontWeight:'bolder',fontSize:'Large'}:{backgroundColor:'white'}} >Player 1: {gameData.player1.toUpperCase()} <br/>(X)</p>
              <p className='GameP2' id = 'GameP2' style={(cturnX[0]===false)?{backgroundColor:'orange',color:'black',fontWeight:'bolder',fontSize:'Large'}:{backgroundColor:'white'}}>Player 2: {gameData.player2.toUpperCase()} <br/>(O)</p>
           
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
    { cgameOver[0] && cgameOver[1] === 'X' ?
      <div style={{ color: 'slateblue', fontStyle: 'italic', fontSize: 'xx-large', fontWeight: 'bolder', textAlign: 'center' }}>
        <p style={{ color: 'black', fontStyle: 'normal' }}>Game is over</p>
        <p>{gameData.player1} won the match</p>
      </div>
      :
      cgameOver[0] && cgameOver[1] === 'O' ?
        <div style={{ color: 'orange', fontStyle: 'italic', fontSize: 'xx-large', fontWeight: 'bolder', textAlign: 'center' }}>
          <p style={{ color: 'black', fontStyle: 'normal' }}>Game is over</p>
          <p>{gameData.player2} won the match</p>
        </div>
        :
        cgameOver[0] && cgameOver[1] === 'D' ?
          <div style={{ color: 'black', fontStyle: 'italic', fontSize: 'xx-large', fontWeight: 'bolder', textAlign: 'center' }}>
            <p style={{ color: 'black', fontStyle: 'normal' }}>Game is over</p>
            <p>It was a draw</p>
          </div>
          :
          null
    }
  </div>
  
       
      
        
        
        <div className='ClassicContainer'> {createGrid(nC, cmatrix,setCMatrix,cturnX,setCTurnX,xcmatriX,ocmatriX, cgameOver, setCGameOver)}</div> 
           
    </div> 
      </div>
    );
  }
  



export default Classic