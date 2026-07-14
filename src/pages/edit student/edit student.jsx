import { useState, useEffect } from 'react';

function EditStudent({ student, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roll: '',
    section: '',
    year: '',
    cgp: '',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        roll: student.roll || '',
        section: student.section || '',
        year: student.year || '',
        cgp: student.cgp || '',
      });
    }
  }, [student]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      ...student,
      ...formData,
      cgp: Number(formData.cgp),
    });
  };

  return (
    <form className="edit-student-form" onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="roll" value={formData.roll} onChange={handleChange} placeholder="Roll" />
      <input name="section" value={formData.section} onChange={handleChange} placeholder="Section" />
      <input name="year" value={formData.year} onChange={handleChange} placeholder="Year" />
      <input name="cgp" value={formData.cgp} onChange={handleChange} placeholder="CGPA" />
      <div className="student-actions">
        <button type="submit" className="btn-save">Save</button>
        <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default EditStudent;
