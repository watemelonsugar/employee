import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useName } from '../App';

const OtherDetails = () => {
  const domains = [
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
    // Add more domains as needed
  ];




  const [preferedDomain, setPreferedDomain] = useState('');
  const [address, setAddress] = useState('');
  const [experience, setExperience] = useState('');
  const [doj, setDoj] = useState(new Date());
  const [suggestion, setSuggestion] = useState('');
  const navigate = useNavigate();
  const { name: name } = useName();

  

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    let matchedDomain = '';
    for (let i = 0; i < domains.length; i++) {
      if (domains[i].toLowerCase().startsWith(inputValue)) {
        matchedDomain = domains[i];
        break;
      }
    }
    setSuggestion(matchedDomain);
    setPreferedDomain(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && suggestion !== '') {
      e.preventDefault();
      setPreferedDomain(suggestion);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        preferedDomain: preferedDomain,
        address: address,
        experience: experience,
        doj: doj,
      };

      const response = await fetch(`http://34.238.38.27:8000/otherdetails/${name}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();

      if (response.ok) {
        setPreferedDomain('');
        setDoj(new Date());
        setExperience('');
        setAddress('');
        navigate("/displayDetail");
        toast.success("Submission Successful");
      } else {
        toast.error(responseData.message || "Submission Unsuccessful");
      }

    } catch (err) {
      console.error(err.message);
      toast.error("Submission Unsuccessful");
    }
  };

  const handleInput = () => {
    navigate("/");
  }

  return (
    <>
      <form className='form'>
        <h1 className='inputHeader'>Employee Details</h1>
        <br />
        <div>
          <label className='label'>Preferred Domain
            <div className='input-container'>
              <input
                autoFocus
                placeholder='Enter Preferred Domain'
                required
                type="text"
                value={preferedDomain}
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
          <br />
          <label className='label'>Employee DOJ
            <DatePicker
              className="form-control"
              selected={doj}
              onChange={(date) => setDoj(date)} />
          </label>
        </div>
        <div>
          <label className='label'>Employee Address
            <input
              placeholder='Enter address'
              required
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className='label'>Employee Experience
            <input
              placeholder='Enter Experience'
              required
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </label>
        </div>

        <button type="submit" onClick={handleSubmit} className='submit'>Submit</button>
        <button onClick={handleInput}>Back</button>
        <ToastContainer />
      </form>
    </>
  );
};

export default OtherDetails;
