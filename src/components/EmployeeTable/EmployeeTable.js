import React, { Component } from "react";
import "./EmployeeTable.css";
import API from "../../utils/API";
import EmployeeRow from "../EmployeeRow/EmployeeRow";
import Filter from "../Filter/Filter";

class EmployeeTable extends Component {
  state = {
    employees: [],
    filter: "",
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

  setFilter = (e) => {
    this.setState({
      filter: e.target.value,
    });
  };

  render() {
    return (
      <div className="table-wrapper">
        <Filter filter={this.state.filter} setFilter={this.setFilter} />
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
            {this.state.employees
              .filter((e) =>
                e.lastName
                  .toLowerCase()
                  .includes(this.state.filter.toLowerCase())
              )
              .map((e, index) => {
                return (
                  <EmployeeRow
                    key={index}
                    image={e.image}
                    firstName={e.firstName}
                    lastName={e.lastName}
                    dob={e.dob}
                    phone={e.phone}
                    email={e.email}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default EmployeeTable;
