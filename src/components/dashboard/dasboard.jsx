import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Clock from '../clock/clock';
import { STORAGE_KEYS, readFromStorage } from '../../utils/storage';
import './dasboard.css';

function Dashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [placedStudents, setPlacedStudents] = useState(0);
  const [companies, setCompanies] = useState(0);
  const [pendingStudents, setPendingStudents] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedStudents = readFromStorage(STORAGE_KEYS.STUDENTS, []);
    const studentCount = Array.isArray(storedStudents) ? storedStudents.length : 0;
    setTotalStudents(studentCount);
  }, []);

  function increasePlacedStudents() {
    setPlacedStudents((prev) => prev + 1);
  }

  function increaseCompanies() {
    setCompanies((prev) => prev + 1);
  }

  function increasePendingStudents() {
    setPendingStudents((prev) => prev + 1);
  }
  // useEffect(() => {
  //   alert("welcome admin");
  // }, []);

  useEffect(() => {
    const loginStatus = readFromStorage(STORAGE_KEYS.IS_LOGIN, false);
    if (!loginStatus) {
      navigate("/login");
      console.log("User is not logged in. Redirecting to login page...");
    } else {
      console.log("User is logged in.");
    }
  }, [navigate]);

  function handleAddStudent() {
    navigate('/register');
  }
  


  return (
    <div className="dashboard">
      <h1>Welcome Back</h1>
      <Clock />

      <div className="card">
        <h2>{totalStudents}</h2>
        <button type="button" onClick={handleAddStudent}>
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