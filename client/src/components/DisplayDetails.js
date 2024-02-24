import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DisplayDetails = () => {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [deptCounts, setDeptCounts] = useState({});
  const navigate = useNavigate()

  const getEmployeeDetails = async () => {
    try {
      const response = await fetch("http://34.238.38.27:8000/display", {
        method: "GET",
        headers: {
          'Content-Type': "application/json"
        }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setEmployeeDetails(data);
        console.log(employeeDetails)
      } else {
        console.error("Data received is not an array:", data);
      }
    } catch (error) {
      console.error(error.message);
      // Handle error, show toast or other UI feedback
      toast.error("Failed to fetch employee details");
    }
  }

  const getEmployeeDeptCounts = async () => {
    try {
      const response = await fetch("http://localhost:8000/employee-count-by-dept", {
        method: "GET",
        headers: {
          'Content-Type': "application/json"
        }
      });
      const data = await response.json();
      setDeptCounts(data);
    } catch (error) {
      console.error(error.message);
      // Handle error, show toast or other UI feedback
      toast.error("Failed to fetch employee department counts");
    }
  }

  useEffect(() => {
    getEmployeeDetails();
    getEmployeeDeptCounts();
  }, []);

  const handleClick = () =>{
    navigate("/")
  }

  return (
    <div>
      <div className="table-container">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Employee Id</th>
              <th>Employee Name</th>
              <th>Employee Dept</th>
              <th>Employee dob</th>
              <th>Employee Gender</th>
              <th>Employee Designation</th>
              <th>Employee Salary</th>
              <th>Employee Email</th>
              <th>Employee Preferred Domain</th>
              <th>Employee Doj</th>
              <th>Employee Address</th>
              <th>Employee Experience</th>
            </tr>
          </thead>
          <tbody>
            {employeeDetails.map((employeeDetail) => (
              <tr key={employeeDetail.employee_id}>
                <td>{employeeDetail.employee_id}</td>
                <td>{employeeDetail.name}</td>
                <td>{employeeDetail.dept}</td>
                <td>{employeeDetail.dob}</td>
                <td>{employeeDetail.gender}</td>
                <td>{employeeDetail.designation}</td>
                <td>{employeeDetail.salary}</td>
                <td>{employeeDetail.email}</td>
                <td>{employeeDetail.prefereddomain}</td>
                <td>{employeeDetail.doj}</td>
                <td>{employeeDetail.address}</td>
                <td>{employeeDetail.experience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Employee Counts by Department</h2>
        <ul>
          {Object.entries(deptCounts).map(([dept, count]) => (
            <li key={dept}>
              {dept}: {count}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleClick}>Back</button>
    </div>
  );
};

export default DisplayDetails;
