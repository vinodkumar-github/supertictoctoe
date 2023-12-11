import React, { useState } from 'react';
import './App.css';
import UserData from './UserData';

function App() {
 const [confirmed, setConfirmed] = useState(false);
  return (
    <div className="App">
     {!confirmed ? <UserData setConfirmed={setConfirmed}/> : <></>}
    </div>
  );
}

export default App;
