import React from 'react'
import './UnitSquare.css'


function UnitSquare({n, i,j,mat, setMatrix, turnX, setTurnX, progress, setProgress, gameOver}) {
  function handleUnitCellClick (e){
    
    
    if((turnX[1]=== String(i) && turnX[2]=== String(j))||(turnX[1]==='' && turnX[1]==='')){
    const cellValue = e.target.id;
   
    const newArray = cellValue.split('-').length===4? cellValue.split('-'): cellValue.split('-').length === 5 ? cellValue.split('-').slice(1):alert(`Something is wrong. newArray.length = ${cellValue.split('-').length}`)
    let [a, b, c, d] = newArray;
     

    const nMatrix = [...mat];
   if(nMatrix[a][b][c][d]!== 'X'&& nMatrix[a][b][c][d]!== 'O' ) {
    if(turnX[0]){
      nMatrix[a][b][c][d] = 'X';
     
      setMatrix(nMatrix);
     if( won(nMatrix,"X",a,b)) {
      for (let x=0;x< nMatrix.length ; x++) {
        for (let y=0;y< nMatrix.length ; y++) {
          nMatrix[a][b][x][y] = 'X'
        }
      }
      setMatrix(nMatrix);
      setTurnX([false,'','']);
      const newProgress = [...progress];
      let xyx = `${i}-${j}-X`;
      
      newProgress.push(xyx);
      setProgress(newProgress);

     } else{
      
      let xyx = `${c}-${d}-X`;
      let xyo =`${c}-${d}-O`;
      if( progress.some(cell => cell === xyx) ||progress.some(cell => cell === xyo)  ){
        setTurnX([false,'',''])
      } else{
      setTurnX([false,c,d]);}}
    }

       if(!turnX[0]){
      nMatrix[a][b][c][d] = 'O';
    
      
      
      setMatrix(nMatrix);
     if( won(nMatrix,"O",a,b)) {
      for (let x=0;x< nMatrix.length ; x++) {
        for (let y=0;y< nMatrix.length ; y++) {
          nMatrix[a][b][x][y] = 'O'
        }
      }
      setMatrix(nMatrix);
      setTurnX([true,'',''])
      const newProgress = [...progress];
      let xyo =`${i}-${j}-O`;
      newProgress.push(xyo);
      setProgress(newProgress);
     }
     else{
      let xyx = `${c}-${d}-X`;
      let xyo =`${c}-${d}-O`;
      if( progress.some(cell => cell === xyx) ||progress.some(cell => cell === xyo)  ){
        setTurnX([true,'',''])
      } else{
      setTurnX([true,c,d])}}
    }
   }
  }
  

  }
     
  function grid(n, i,j){
          const columns = [];
            for (let k = 0; k <n; k++) {
              const rows = [];
               for (let l = 0; l <n; l++) {
                rows.push(
                 <div key={`0-${i}-${j}-${k}-${l}`} id={`0-${i}-${j}-${k}-${l}`}className='unitCell'  
                 onClick={e=>handleUnitCellClick(e)} 
                 style={ (mat[i][j][k][l]==='X' ||  gameOver[1]==='X')? { backgroundColor:'slateblue',color:'white', fontSize:'x-large' }: mat[i][j][k][l]==='O'|| gameOver[1]==='O'?{backgroundColor:'orange', color:'black', fontSize:'x-large' }:{backgroundColor:'white'}}
                > <p key={`${i}-${j}-${k}-${l}`} id={`${i}-${j}-${k}-${l}`} name= {`${i}-${j}-${k}-${l}`} 
                className='eachRow' onClick={e=>handleUnitCellClick(e)} 
                style={(mat[i][j][k][l]==='X'||gameOver[1]==='X'||mat[i][j][k][l]==='O'||gameOver[1]==='O')? {display:'flex', fontWeight:'bolder'}: {display:'none'}
              }>{gameOver[0]? gameOver[1]: mat[i][j][k][l]}</p></div>
                  );
                   } columns.push(
                <div key={`col-${i}-${j}-${k}`} id={`col-${i}-${j}-${k}`} className='eachColumn'>{rows}</div>
                );}
              ; return <div >{columns}</div>;
          }
    
  return (
    <div className = 'unitMatrix' style = {( progress.some(cell => cell === `${i}-${j}-X`)) ?{border: "10px solid slateblue"}:( progress.some(cell => cell === `${i}-${j}-O`)) ?{border: "10px solid orange"}:(isMatrixFilled(mat,i,j))?{border: "10px solid grey"}:(((turnX[1]=== String(i) && turnX[2]=== String(j))||(turnX[1]===''&&turnX[2]===''))&&(gameOver[0]=== false))? {border: "10px solid tomato"}: {border: "10px solid white"} }>{grid(n, i,j)}</div>
  )
}

function isMatrixFilled(matrix,i,j) {
  const evalMatrix = [...matrix];
  const newMatrix = evalMatrix[i][j]; 
          return newMatrix.every(row => row.every(cell => cell === 'X' || cell === 'O')) && newMatrix.some(row => row.some(cell => cell === 'O' )) && newMatrix.some(row => row.some(cell => cell === 'X' ))}
  
  function isHorizontalwin (matrix, c,i,j) {
    const evalMatrix = [...matrix];
    const newMatrix = evalMatrix[i][j]; 
    for (let p = 0; p < newMatrix.length; p++) {
      if (newMatrix[p] && newMatrix[p].every(cell => cell === c)) {
        return true;
      }
    }
    return false;
  };
  
  function isdiagonal1win(matrix, c,i,j) {
    const evalMatrix = [...matrix];
  const newMatrix = evalMatrix[i][j]; 
          return newMatrix.every((row, index) => row[index] === c); }
  function isdiagonal2win(matrix, c,i,j) {
        const evalMatrix = [...matrix];
        const newMatrix = evalMatrix[i][j]; 
        return newMatrix.every((row, index) => row[newMatrix.length - 1 - index] === c);}
function isVerticalwin(matrix, c, i, j) {
          return [...matrix[i][j][0]].some((_, p) => matrix[i][j].every(cell => cell[p] === c));
        }
          
  
  function won(matrix,c,i,j){
  if (isHorizontalwin(matrix,c,i,j)|| isVerticalwin(matrix,c,i,j) || isdiagonal1win(matrix,c,i,j) ||isdiagonal2win(matrix,c,i,j)) {
    return true
  }
  else { return false}
  } 



export default UnitSquare