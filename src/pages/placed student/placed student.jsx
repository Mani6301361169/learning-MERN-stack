import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { STORAGE_KEYS, saveToStorage, readFromStorage } from "../../utils/storage";
import "./placed student.css";

function PlacedStudentPage({ onStudentPlaced }) {
  const navigate = useNavigate();
  const location = useLocation();
  const editingPlacedStudent = location.state?.student || null;
  const [isEditMode, setIsEditMode] = useState(Boolean(editingPlacedStudent));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roll: "",
    company: "",
    jobRole: "",
    package: "",
    placementDate: "",
    status: "Placed",
    notes: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingPlacedStudent) {
      setIsEditMode(true);
      setFormData({
        name: editingPlacedStudent.name || "",
        email: editingPlacedStudent.email || "",
        roll: editingPlacedStudent.roll || "",
        company: editingPlacedStudent.company || "",
        jobRole: editingPlacedStudent.jobRole || "",
        package: editingPlacedStudent.package || "",
        placementDate: editingPlacedStudent.placementDate || "",
        status: editingPlacedStudent.status || "Placed",
        notes: editingPlacedStudent.notes || "",
      });
    }
  }, [editingPlacedStudent]);

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
      case "roll":
        if (!value.trim()) return "Roll number is required";
        if (!/^[A-Za-z0-9-]+$/.test(value)) return "Roll number can only contain letters, numbers, and hyphens";
        return "";
      case "company":
        if (!value.trim()) return "Company name is required";
        return "";
      case "jobRole":
        if (!value.trim()) return "Job role is required";
        return "";
      case "package":
        if (!value.trim()) return "Offer package is required";
        return "";
      case "placementDate":
        if (!value) return "Placement date is required";
        return "";
      case "status":
        if (!value.trim()) return "Status is required";
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

    const existingPlacedStudents = readFromStorage(STORAGE_KEYS.PLACED_STUDENTS, []);

    if (!isEditMode) {
      const emailExists = existingPlacedStudents.some((student) => student.email === formData.email);
      if (emailExists) {
        setErrors({ email: "This student is already marked as placed." });
        return;
      }
    }

    const placedStudent = {
      id: editingPlacedStudent?.id || Date.now(),
      name: formData.name,
      email: formData.email,
      roll: formData.roll,
      company: formData.company,
      jobRole: formData.jobRole,
      package: formData.package,
      placementDate: formData.placementDate,
      status: formData.status,
      notes: formData.notes,
      createdAt: new Date().toISOString(),
    };

    try {
      const updatedPlacedStudents = isEditMode
        ? existingPlacedStudents.map((studentItem) => (studentItem.id === editingPlacedStudent.id ? placedStudent : studentItem))
        : [...existingPlacedStudents, placedStudent];

      saveToStorage(STORAGE_KEYS.PLACED_STUDENTS, updatedPlacedStudents);
      onStudentPlaced?.(placedStudent);
      handleReset();
      alert(isEditMode ? "Placed student updated successfully!" : "Placed student saved successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to save placed student:", error);
      alert("Something went wrong while saving placement data.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      roll: "",
      company: "",
      jobRole: "",
      package: "",
      placementDate: "",
      status: "Placed",
      notes: "",
    });
    setErrors({});
    setIsEditMode(false);
  };

  return (
    <section className="register-section placed-student-section">
      <div className="placed-student-intro">
        <div>
          <p className="eyebrow">Placement details</p>
          <h2>{isEditMode ? "Edit Placed Student" : "Add Placed Student"}</h2>
          <p>Capture the company offer, package, and placement status in one polished form.</p>
        </div>
        <div className="status-chip">{isEditMode ? "Update record" : "New placement"}</div>
      </div>

      <form className="register-form placed-student-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Student Name</label>
          <input id="name" name="name" type="text" placeholder="Enter student name" value={formData.name} onChange={handleChange} />
          {errors.name && <small className="error-message">{errors.name}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
          {errors.email && <small className="error-message">{errors.email}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="roll">Roll Number</label>
          <input id="roll" name="roll" type="text" placeholder="Enter roll number" value={formData.roll} onChange={handleChange} />
          {errors.roll && <small className="error-message">{errors.roll}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" placeholder="Enter company name" value={formData.company} onChange={handleChange} />
          {errors.company && <small className="error-message">{errors.company}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="jobRole">Job Role</label>
          <input id="jobRole" name="jobRole" type="text" placeholder="Enter job role" value={formData.jobRole} onChange={handleChange} />
          {errors.jobRole && <small className="error-message">{errors.jobRole}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="package">Package (CTC)</label>
          <input id="package" name="package" type="text" placeholder="e.g. 8 LPA" value={formData.package} onChange={handleChange} />
          {errors.package && <small className="error-message">{errors.package}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="placementDate">Placement Date</label>
          <input id="placementDate" name="placementDate" type="date" value={formData.placementDate} onChange={handleChange} />
          {errors.placementDate && <small className="error-message">{errors.placementDate}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange}>
            <option value="Placed">Placed</option>
            <option value="Selected">Selected</option>
            <option value="Offer in Progress">Offer in Progress</option>
            <option value="On Hold">On Hold</option>
          </select>
          {errors.status && <small className="error-message">{errors.status}</small>}
        </div>
        <div className="form-group form-group-full">
          <label htmlFor="notes">Notes</label>
          <textarea id="notes" name="notes" rows="4" placeholder="Add notes about the placement drive or offer details" value={formData.notes} onChange={handleChange} />
        </div>

        <button type="submit" className="button-primary">{isEditMode ? "Save Placement" : "Save Placement"}</button>
      </form>

      <div className="form-actions">
        <button type="button" className="back-button" onClick={handleReset}>Reset Form</button>
        <button type="button" className="secondary-button" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      </div>
    </section>
  );
}

export default PlacedStudentPage;