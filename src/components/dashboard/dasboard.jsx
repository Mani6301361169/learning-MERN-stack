import { useState, useEffect } from 'react';
import Clock from '../clock/clock';
import './dasboard.css';


function Dashboard() {
  const [totalStudents, setTotalStudents] = useState(252);
  const [placedStudents, setPlacedStudents] = useState(50);
  const [companies, setCompanies] = useState(33);
  const [pendingStudents, setPendingStudents] = useState(40);

  function increaseTotalStudents() {
    setTotalStudents((prev) => prev + 1);
  }

  function increasePlacedStudents() {
    setPlacedStudents((prev) => prev + 1);
  }

  function increaseCompanies() {
    setCompanies((prev) => prev + 1);
  }

  function increasePendingStudents() {
    setPendingStudents((prev) => prev + 1);
  }
  useEffect(() => {
    alert("welcome admin")
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome Back</h1>
      <Clock />

      <div className="card">
        <h2>{totalStudents}</h2>
        <button type="button" onClick={increaseTotalStudents}>
          Add Student
        </button>
        <p>Total Students</p>
      </div>

      <div className="card">
        <h2>{placedStudents}</h2>
        <button type="button" onClick={increasePlacedStudents}>
          Add Placed Student
        </button>
        <p>Placed</p>
      </div>
      <div className="card">
        <h2>{companies}</h2>
        <button type="button" onClick={increaseCompanies}>
          Add Company
        </button>
        <p>Companies</p>
      </div>
      <div className="card">
        <h2>{pendingStudents}</h2>
        <button type="button" onClick={increasePendingStudents}>
          Add Pending Student
        </button>
        <p>Pending</p>
      </div>
    </div>
  );
}

export default Dashboard;