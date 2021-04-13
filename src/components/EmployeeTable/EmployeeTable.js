import React, { Component } from "react";
import "./EmployeeTable.css";
import API from "../../utils/API";
import EmployeeRow from "../EmployeeRow/EmployeeRow";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";


class EmployeeTable extends Component {
  state = {
    employees: [],
    filter: "",
    sorted: false,
  };

  // this will generate random Users upon loading and add them to localStorage
  // this prevents new data from being generated everytime there is a page refresh
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


handleSort = (e) => {
    // sort firstName in asc/desc when Sort button is clicked
    if (!this.state.sorted) {
        this.state.employees.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1);
        this.setState({
                  sorted: true,
                });
    } else {
        this.state.employees.sort((a, b) => (a.firstName > b.firstName) ? -1 : 1);
        this.setState({
            sorted: false,
          });
    }
}

  render() {
    return (
      <div className="table-wrapper">
        <Filter 
            filter={this.state.filter} 
            setFilter={this.setFilter} 
        />
        <table>
          <thead className="bg-light">
            <tr>
              <th>Image</th>
                <Sort 
                    handleSort={this.handleSort}
                    header = 'First Name'
                />
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
                  .startsWith(this.state.filter.toLowerCase())
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
