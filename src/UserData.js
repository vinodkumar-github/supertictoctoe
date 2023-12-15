import React from 'react';
import Later from './Later';
import './UserData.css';

function UserData({setConfirmed, gameData, setGameData, initialGameData }) {
   

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGameData({
      ...gameData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const updatedGameData = {
      player1: formData.get('player1'),
      player2: formData.get('player2'),
      mode: formData.get('mode'),
      grid: formData.get('grid'),
      submitted: true
    };

    setGameData(updatedGameData);
  
   
  };
  const handleReset = () => {
    setGameData({ ...initialGameData });
  };


  return (
    <div>
    <div className='UserDataContainer'>
      <form onSubmit={handleSubmit} className='UserDataForm'>
        <label htmlFor="player1" className='Label'>Player 1 Name:</label>
        <input
          type='text'
          id="player1"
          name="player1"
          className="playername InputField"
          value={gameData.player1}
          onChange={handleInputChange}
          required
        />
        
        <label htmlFor="player2" className='Label'>Player 2 Name:</label>
        <input
          type='text'
          id="player2"
          name="player2"
          className="playername InputField"
          value={gameData.player2}
          onChange={handleInputChange}
          required
        />
        <div className='ModeContainer'>
        <br />
          <label className='ModeLabel'>Mode:</label>
          <br /><br />
          <label htmlFor="Super" className='RadioLabel'style={(gameData.mode === "Super")? {fontSize:'large',fontWeight:'bolder'}:null}>
            <input
              type="radio"
              id="Super"
              name="mode"
              value="Super"
              className='RadioButton'
              checked={gameData.mode === 'Super'}
              onChange={handleInputChange}
            />
            {gameData.mode === "Super" && gameData.grid >= 3 ? <text>Super TicTacToe:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[{gameData.grid}×{gameData.grid}×{gameData.grid}]Grid</text>: "Super TicTacToe"}
          </label>
          {gameData.mode === "Super" ? (
          <div className='GridContainer'>
            <label htmlFor="grid" className='Label'>Grid Size:</label>
            <input
              type='number'
              min={3}
              id="grid"
              name="grid"
              value={gameData.grid}
              onChange={handleInputChange}
              placeholder='Select 3 or above'
          
              required
              className='GridInputField'
            />
          </div>
        ) : null}
          <label htmlFor="Classic" className='RadioLabel' style={(gameData.mode === "Classic")? {fontSize:'large',fontWeight:'bolder'}:null}>
            <input
              type="radio"
              id="Classic"
              name="mode"
              value="Classic"
              className='RadioButton'
              checked={gameData.mode === 'Classic'}
              onChange={handleInputChange}
            />
            {gameData.mode === "Classic" && gameData.grid >= 3 ?  <text>Classic TicTacToe:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[{gameData.grid}×{gameData.grid}×{gameData.grid}]Grid</text>: "Classic TicTacToe"}
          </label>
        </div>
        {gameData.mode === "Classic" ? (
          <div className='GridContainer'>
            <label htmlFor="grid" className='Label'>Grid Size:</label>
            <input
              type='number'
              min={3}
              id="grid"
              name="grid"
              value={gameData.grid}
              onChange={handleInputChange}
             
              placeholder='Select 3 or above'
              required
              className='GridInputField'
            />
          </div>
        ) : null}
        
        <div className='ButtonContainer'>
        <button type="submit" className='SubmitButton'>Submit</button>
        <button type="button" className='ResetButton' onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
    {gameData.submitted? <Later gameData={gameData}  setConfirmed={setConfirmed}/> : <></>}
    </div>
  );
}

export default UserData;
