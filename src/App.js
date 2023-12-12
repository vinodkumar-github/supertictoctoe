import React, { useState } from 'react';
import './App.css';
import UserData from './UserData';
import Game from './Game';

function App() {
 const [confirmed, setConfirmed] = useState(false);
 const initialGameData ={
  player1: '',
  player2: '',
  mode: '',
  grid: '',
  submitted: false
};
const [gameData, setGameData] = useState({ ...initialGameData });
  return (
    <div className="App">
     {!confirmed ? <UserData setConfirmed={setConfirmed} gameData={gameData} setGameData={setGameData} initialGameData={initialGameData }/> : <Game gameData={gameData}/> }
    </div>
  );
}

export default App;
