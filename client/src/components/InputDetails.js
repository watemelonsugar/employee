import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useName } from '../App';
import "../index.css";

const InputDetails = () => {
  const designations = [
    "Manager",
    "Engineer",
    "Developer",
    "Analyst",
    "Coordinator",
    "Specialist",
    "Consultant",
    "Supervisor",
    "Assistant",
    "Technician",
    "Administrator",
    "Designer",
    "Coordinator",
    "Executive",
    "Officer",
    "Leader",
    "Coordinator",
    "Senior Technical Analyst",
    "Senior Accountant",
    "Senior Developer"
    // Add more designations as needed
  ];

  const [name, setName] = useState('');
  const [dob, setDob] = useState(null);
  const [salary, setSalary] = useState('');
  const [designation, setDesignation] = useState('');
  const [dept, setDept] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const navigate = useNavigate();
  const { handleName } = useName();

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    let matchedDesignation = '';
    for (let i = 0; i < designations.length; i++) {
      if (designations[i].toLowerCase().startsWith(inputValue)) {
        matchedDesignation = designations[i];
        break;
      }
    }
    setSuggestion(matchedDesignation);
    setDesignation(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && suggestion !== '') {
      e.preventDefault();
      setDesignation(suggestion);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleName(name);
    try {
      if (name.length > 30) {
        toast.error("Name should not exceed 30 characters");
        return;
      }
      if (salary.toString().length > 8) {
        toast.error("Salary should not exceed 8 digits");
        return;
      }
      if (!dob) {
        toast.error("Please enter Date of Birth");
        return;
      }
      
      // Calculate age
      const dobDate = new Date(dob);
      const today = new Date();
      const ageDiff = today.getFullYear() - dobDate.getFullYear();
      const isAbove18 = ageDiff > 18 || (ageDiff === 18 && today.getMonth() > dobDate.getMonth()) || (ageDiff === 18 && today.getMonth() === dobDate.getMonth() && today.getDate() >= dobDate.getDate());
      
      if (!isAbove18) {
        toast.error("Age must be above 18");
        return;
      }

      const formData = {
        name: name,
        dob: dob,
        salary: salary,
        dept: dept,
        designation: designation,
        gender: gender,
        email: email
      };

      const response = await fetch("http://34.238.38.27:8000/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();

      if (response.ok) {
        setName('');
        setDob(null);
        setSalary('');
        setDept('');
        setDesignation('');
        setGender('');
        setEmail('');
        navigate(`/otherdetails/${responseData.name}`);
        toast.success("Submission Successful");
      } else {
        toast.error(responseData.message || "Submission Unsuccessful");
      }

    } catch (err) {
      console.error(err.message);
      toast.error("Submission Unsuccessful");
    }
  };

  return (
    <>
      <form className='form'>
        <h1 className='inputHeader'>Employee Details</h1>
        <br />
        <div>
          <label className='label'>Employee Name
            <input
              autoFocus
              placeholder='Enter Name'
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className='label'>Employee DOB
            <DatePicker
              className="form-control"
              selected={dob}
              onChange={(date) => setDob(date)} />
          </label>
        </div>
        <div>
          <label className='label'>Employee Salary
            <input
              placeholder='Enter salary'
              required
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </label>
          <label className='label'>Employee Dept
            <select
              required
              value={dept}
              onChange={(e) => setDept(e.target.value)}>
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
            </select>
          </label>
        </div>
        <div>
          <label className='label'>Employee Designation
          <div className='input-container'>
            <input
                placeholder='Enter Designation'
                required
                type="text"
                value={designation}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className='designation'
            />
            {suggestion && (
              <div className="dropdown">
                <span className="suggestion">{suggestion}</span>
              </div>
            )}
          </div>
          </label>
        </div>
        <br />
        <br />
        <br />
        <div>
          <label className="label">Employee Gender
            <input
              placeholder='Enter Gender'
              required
              type="radio"
              name="gender"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
            /> Male
            <input
              placeholder='Enter Gender'
              required
              type="radio"
              name="gender"
              value="Female"
              checked={gender === "Female"}
              onChange={(e) => setGender(e.target.value)}
            /> Female
          </label>
          <label className='label'>Employee Email
            <input
              placeholder='Enter Email'
              required
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" onClick={handleSubmit} className='submit'>Submit</button>
        <ToastContainer />
      </form>
    </>
  );
};

export default InputDetails;
