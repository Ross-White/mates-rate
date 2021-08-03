import './App.css';
import React, { useState } from 'react';
import Form from './components/Form';

function App() {

  const [toDos, setTodos] = useState([]);


  return (
    <div>
      <Form onSubmit={text => setTodos([{text, complete: false }, ...toDos])}
      />
      <div>
        {toDos.map(({ text }) => 
        <div key={text}>{text}</div>
        )}
        </div>
    </div>
  )
}

export default App;
