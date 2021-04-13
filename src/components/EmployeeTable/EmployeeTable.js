import React, { Component } from "react";
import "./EmployeeTable.css";
import API from "../../utils/API";

class EmployeeTable extends Component {
  state = {
    employees: [],
  };

  componentDidMount() {
    let storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];

    storedEmployees.length === 0
      ? API.getRandomUsers().then((res) => {
          const employeeMap = res.data.results.map((e) => ({
            id: e.id.value,
            image: e.picture.thumbnail,
            firstName: e.name.first,
            lastName: e.name.last,
            dob: e.dob.date,
            phone: e.phone,
            email: e.email,
          }));
          this.setState({
            employees: employeeMap,
          });
          localStorage.setItem("employees", JSON.stringify(employeeMap));
        })
      : this.setState({
          employees: storedEmployees,
        });
  }

  render() {
    return (
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>DOB</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
           
          </tbody>
        </table>
      </div>
    );
  }
}

export default EmployeeTable;
