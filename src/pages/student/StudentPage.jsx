import '../../App.css';
import './student.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('students');
      const arr = raw ? JSON.parse(raw) : [];
      setStudents(arr);
    } catch (e) {
      console.error('Failed to load students from localStorage', e);
    }
  }, []);

  const handleDelete = (studentId) => {
    const copy = students.filter((student) => student.id !== studentId);
    setStudents(copy);
    localStorage.setItem('students', JSON.stringify(copy));
  };

  const startEdit = (student) => {
    navigate('/register', { state: { student } });
  };

  return (
    <div className="students-table-card">
      <h2>Students</h2>
      {students.length === 0 ? (
        <div className="students-empty">No registered students yet.</div>
      ) : (
        <table className="students-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Roll</th>
              <th>Section</th>
              <th>Year</th>
              <th>CGPA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s.id || s.roll + i}>
                <td>{i + 1}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.roll}</td>
                <td>{s.section}</td>
                <td>{s.year}</td>
                <td>{s.cgp}</td>
                <td className="student-actions">
                  <button className="btn-edit" onClick={() => startEdit(s)}>Edit</button>
                  <button className="btn-view" onClick={() => alert(JSON.stringify(s, null, 2))}>View</button>
                  <button className="btn-delete" onClick={() => handleDelete(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentPage;
