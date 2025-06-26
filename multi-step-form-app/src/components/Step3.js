import React from "react";

const Step3 = ({ data }) => {
  return (
    <div>
      <h2>Confirm Your Details</h2>
      <p><strong>First Name:</strong> {data.firstName}</p>
      <p><strong>Last Name:</strong> {data.lastName}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Street:</strong> {data.street}</p>
      <p><strong>City:</strong> {data.city}</p>
      <p><strong>ZIP Code:</strong> {data.zip}</p>
    </div>
  );
};

export default Step3;
