import './App.css';
import React, { useState } from 'react';
import Form from './components/Form';
import SignIn from './components/SignIn';

function App() {

  const [toDos, setTodos] = useState([]);


  return (
    <div>
      <SignIn/>
    </div>
  )
}

export default App;
