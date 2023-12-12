import React from 'react';
import './Later.css'


function Later({ gameData,  setConfirmed }) {
    function handleConfirm () {
        
        setConfirmed(true);
    }
 
  return (
   
    <div className="container">
    <hr className="hr-divider" />
    <p className="player-info">Name of Player 1: {gameData.player1}</p>
    <p className="player-info">Name of Player 2: {gameData.player2}</p>
    <p className="player-info">Mode of Game: {gameData.mode}</p>
   {gameData.mode === 'Super'?(<p className="grid-info">Size of the grid is 3 x 3 x 3</p>) : (<p className="grid-info">Size of the grid is {gameData['grid']} x {gameData['grid']}</p>)}
    <div className="center-button-container">
  <button className="confirm-button" onClick={handleConfirm}>
    Confirm
  </button>
  </div>
  </div>
  
  
   
  );
}

export default Later;
