import React from "react";

const Step1 = ({ data, errors, update, inputRef }) => {
  return (
    <div>
      <h2>Personal Information</h2>
      <label>
        First Name:
        <input
          ref={inputRef}
          type="text"
          value={data.firstName}
          onChange={(e) => update({ firstName: e.target.value })}
        />
        {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          value={data.lastName}
          onChange={(e) => update({ lastName: e.target.value })}
        />
        {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={data.email}
          onChange={(e) => update({ email: e.target.value })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </label>
    </div>
  );
};

export default Step1;
