import { useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState(200);
  const [placedStudents, setPlacedStudents] = useState(50);

  function addStudent() {
    setStudents((prevStudents) => prevStudents + 1);
  }

  function addPlacedStudent() {
    setPlacedStudents((prevPlacedStudents) => prevPlacedStudents + 1);
  }

  return (
    <div className="App">
      <h1>Placement Management System</h1>
      <h2>Total Students: {students}</h2>
      <button onClick={addStudent}>Add Student</button>
      

      <h2>Placed Students: {placedStudents}</h2>
      <button onClick={addPlacedStudent}>Add Placed Student</button>
    </div>
  );
}

export default App;