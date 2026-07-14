import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { STORAGE_KEYS, saveToStorage, readFromStorage } from "../../utils/storage";
import "./register.css";

function Register({ onStudentRegistered }) {
  const navigate = useNavigate();
  const location = useLocation();
  const editingStudent = location.state?.student || null;
  const [isEditMode, setIsEditMode] = useState(Boolean(editingStudent));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roll: "",
    section: "",
    age: "",
    cgp: "",
    year: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setIsEditMode(true);
      setFormData({
        name: editingStudent.name || "",
        email: editingStudent.email || "",
        password: editingStudent.password || "",
        roll: editingStudent.roll || "",
        section: editingStudent.section || "",
        age: editingStudent.age ?? editingStudent.cgp ?? "",
        cgp: editingStudent.cgp ?? "",
        year: editingStudent.year || "",
      });
    }
  }, [editingStudent]);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          return "Enter a valid email address";
        }
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return "";
      case "roll":
        if (!value.trim()) return "Roll number is required";
        if (!/^[A-Za-z0-9-]+$/.test(value)) return "Roll number can only contain letters, numbers, and hyphens";
        return "";
      case "section":
        if (!value.trim()) return "Section is required";
        return "";
      case "age":
        if (!value) return "Age is required";
        if (Number(value) < 15 || Number(value) > 60) return "Age must be between 15 and 60";
        return "";
      case "cgp":
        if (!value) return "CGPA is required";
        if (Number(value) < 0 || Number(value) > 10) return "CGPA must be between 0 and 10";
        return "";
      case "year":
        if (!value.trim()) return "Year is required";
        if (!/^(1|2|3|4)$/.test(value)) return "Year must be 1, 2, 3, or 4";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([field, value]) => {
      const error = validateField(field, value);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const existingStudents = readFromStorage(STORAGE_KEYS.STUDENTS, []);

    if (!isEditMode) {
      const emailExists = existingStudents.some((student) => student.email === formData.email);

      if (emailExists) {
        setErrors({ email: "This email is already registered." });
        return;
      }
    }

    const student = {
      id: editingStudent?.id || Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      roll: formData.roll,
      section: formData.section,
      age: Number(formData.age),
      year: formData.year,
      cgp: Number(formData.cgp),
      createdAt: new Date().toISOString(),
    };

    try {
      const updatedStudents = isEditMode
        ? existingStudents.map((studentItem) => (studentItem.id === editingStudent.id ? student : studentItem))
        : [...existingStudents, student];

      saveToStorage(STORAGE_KEYS.STUDENTS, updatedStudents);
      saveToStorage(STORAGE_KEYS.IS_LOGIN, true);
      saveToStorage(STORAGE_KEYS.LOGGED_IN_USER, student.email);

      onStudentRegistered?.(student);
      handleReset();
      alert(isEditMode ? "Student updated successfully!" : "Registration successful!");
      navigate("/student");
    } catch (error) {
      console.error("Failed to save student:", error);
      alert("Something went wrong while saving data.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      roll: "",
      section: "",
      age: "",
      cgp: "",
      year: "",
    });
    setErrors({});
    setIsEditMode(false);
  };

  return (
    <section className="register-section">
      <h2>{isEditMode ? "Edit Student" : "Student Registration"}</h2>
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Enter name" value={formData.name} onChange={handleChange} />
          {errors.name && <small className="error-message">{errors.name}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
          {errors.email && <small className="error-message">{errors.email}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="Enter password" value={formData.password} onChange={handleChange} />
          {errors.password && <small className="error-message">{errors.password}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="roll">Roll Number</label>
          <input id="roll" name="roll" type="text" placeholder="Enter roll number" value={formData.roll} onChange={handleChange} />
          {errors.roll && <small className="error-message">{errors.roll}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="section">Section</label>
          <input id="section" name="section" type="text" placeholder="Enter section" value={formData.section} onChange={handleChange} />
          {errors.section && <small className="error-message">{errors.section}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input id="age" name="age" type="number" placeholder="Enter age" value={formData.age} onChange={handleChange} />
          {errors.age && <small className="error-message">{errors.age}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input id="year" name="year" type="text" placeholder="Enter year" value={formData.year} onChange={handleChange} />
          {errors.year && <small className="error-message">{errors.year}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="cgp">CGPA</label>
          <input id="cgp" name="cgp" type="text" placeholder="Enter CGPA" value={formData.cgp} onChange={handleChange} />
          {errors.cgp && <small className="error-message">{errors.cgp}</small>}
        </div>
        <button type="submit" className="button-primary">{isEditMode ? "Save Changes" : "Register Student"}</button>
      </form>
      <button type="button" className="back-button" onClick={handleReset}>Reset Form</button>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </section>
  );
}

export default Register;