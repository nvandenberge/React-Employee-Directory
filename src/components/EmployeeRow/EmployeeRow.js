import React from "react";
import "./EmployeeRow.css";
import moment from 'moment';
// Using moment.js to format the DOB


function EmployeeRow({ image, firstName, lastName, dob, phone, email }) {
  return (
    <tr className="employee-row">
      <td><img src={image} alt={`${firstName} ${lastName} thumbnail`} className="employee-image"></img></td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{moment(dob).format('L')}</td>
      <td>{phone}</td>
      <td>{email}</td>
    </tr>
  );
}

export default EmployeeRow;
