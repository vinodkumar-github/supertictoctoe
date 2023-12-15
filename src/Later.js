import React from 'react';
import './Later.css'


function Later({ gameData,  setConfirmed }) {
    function handleConfirm () {
        
        setConfirmed(true);
    }
 
  return (
   
    <div className="container">
    <hr className="hr-divider" />
    <p className="player-info">&nbsp;Name of Player 1:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{gameData.player1}</p>
    <p className="player-info">&nbsp;Name of Player 2:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{gameData.player2}</p>
    <p className="player-info">&nbsp;Mode of Game:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{gameData.mode}</p>
   {gameData.mode === 'Super'?(<p className="grid-info">&nbsp;Size of the grid is:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{gameData['grid']} x {gameData['grid']} x {gameData['grid']}</p>) : (<p className="grid-info">&nbsp;Size of the grid is:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{gameData['grid']} x {gameData['grid']}</p>)}
    <div className="center-button-container">
  <button className="confirm-button" onClick={handleConfirm}>
    Confirm
  </button>
  </div>
  </div>
  
  
   
  );
}

export default Later;
