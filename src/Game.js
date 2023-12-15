import React,{useState} from 'react'
import './Game.css'
import Invigil from './Invigil';
function createMatrix() {
    const supermatrix =[];
     for(let h=0; h<3;h++){
     const matrix = [];
     
     for (let i = 0; i < 3; i++) {
       const subMatrixRow = [];
       
       for (let j = 0; j < 3; j++) {
         const subMatrix = [];
         
         for (let k = 0; k < 3; k++) {
           subMatrix.push(`${h}-${i}-${j}-${k}`); // Assigning index values
         }
         
         subMatrixRow.push(subMatrix);
       }
       
       matrix.push(subMatrixRow);
     }
       supermatrix.push(matrix)
     }
     
     return supermatrix;
   }

 


function Game({gameData}) {
    const matri = createMatrix();
    const [matrix, setMatrix] = useState(matri)
    function handleMatrix(e, matrix, setMatrix) {
        const cellValue = e.target.textContent;
        const newArray = cellValue.split('-');
        const [h, i, k, j] = newArray;
      
        const updatedMatrix = [...matrix];
        updatedMatrix[h][i][k][j] = '';
      
        setMatrix(updatedMatrix);
      }


function grid(gameData,matrix,h,i) {

    if (gameData['mode'] === "Super") {
        
      const gridElements = [];
     
        const columns = [];
        for (let j = 0; j <= 2; j++) {
          const rows = [];
          for (let k = 0; k <= 2; k++) {
            rows.push(
              <p key={`${h}-${i}-${k}-${j}`} className="gridRow" id={`${j}-${i}-${k}-${j}`} onClick={(e)=>{ handleMatrix(e,matrix, setMatrix)}} >{matrix[h][i][k][j]}</p>
            );
          }
          columns.push(
            <div key={`col-${h}-${i}-${j}`} className='gridColumn'>{rows}</div>
          );
        }
        gridElements.push(
          <div key={`row-${h}-${i}`} className='SuperGrid'>{columns}</div>
        );
      
      return <div className='Grid Bordering'>{gridElements}</div>;
    }
  }
  
  return (
    <div>
        <div className='GamePlayers'>
            <p className='GameP1'>Player 1: {gameData.player1.toUpperCase()} <br/>(X)</p>
            <p className='GameP2'>Player 2: {gameData.player2.toUpperCase()} <br/>(O)</p>
        </div>
        <div className='Grid'>
  <div className='SuperGrid Centering'>
    {grid(gameData,matrix,0,0)}
    {grid(gameData,matrix,0,1)}
    {grid(gameData,matrix,0,2)}
  </div>
  <div className='SuperGrid Centering'>
    {grid(gameData,matrix,1,0)}
    {grid(gameData,matrix,1,1)}
    {grid(gameData,matrix,1,2)}
  </div>
  <div className='SuperGrid Centering'>
    {grid(gameData,matrix,2,0)}
    {grid(gameData,matrix,2,1)}
    {grid(gameData,matrix,2,2)}
  </div>
</div>
<Invigil setMatrix = {setMatrix}/>
    </div>
  )
}
        
export default Game