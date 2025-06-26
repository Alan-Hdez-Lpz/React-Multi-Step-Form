import React from "react";

const Step2 = ({ data, errors, update, inputRef }) => {
  return (
    <div>
      <h2>Address Details</h2>
      <label>
        Street:
        <input
          ref={inputRef}
          type="text"
          value={data.street}
          onChange={(e) => update({ street: e.target.value })}
        />
        {errors.street && <p style={{ color: "red" }}>{errors.street}</p>}
      </label>
      <br />
      <label>
        City:
        <input
          type="text"
          value={data.city}
          onChange={(e) => update({ city: e.target.value })}
        />
        {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
      </label>
      <br />
      <label>
        ZIP Code:
        <input
          type="text"
          value={data.zip}
          onChange={(e) => update({ zip: e.target.value })}
        />
        {errors.zip && <p style={{ color: "red" }}>{errors.zip}</p>}
      </label>
    </div>
  );
};

export default Step2;
