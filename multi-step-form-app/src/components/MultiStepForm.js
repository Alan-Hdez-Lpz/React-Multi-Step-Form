import React, { useState, useReducer, useCallback, useMemo, useRef, useEffect } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

// Initial state for the form
const initialState = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
  },
  address: {
    street: "",
    city: "",
    zip: "",
  },
  errors: {},
};

function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          ...action.payload,
        },
      };
    case "UPDATE_ADDRESS":
      return {
        ...state,
        address: {
          ...state.address,
          ...action.payload,
        },
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        errors: {},
      };
    default:
      return state;
  }
}

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Refs to focus first input on each step
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);

  // Focus on first input when step changes
  useEffect(() => {
    if (step === 1 && step1Ref.current) {
      step1Ref.current.focus();
    } else if (step === 2 && step2Ref.current) {
      step2Ref.current.focus();
    }
  }, [step]);

  // Validation functions
  const validateStep = useCallback(() => {
    let errors = {};

    if (step === 1) {
      const { firstName, lastName, email } = state.personalInfo;
      if (!firstName.trim()) errors.firstName = "First name is required";
      if (!lastName.trim()) errors.lastName = "Last name is required";
      if (!email.trim()) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email address is invalid";
      }
    } else if (step === 2) {
      const { street, city, zip } = state.address;
      if (!street.trim()) errors.street = "Street is required";
      if (!city.trim()) errors.city = "City is required";
      if (!zip.trim()) errors.zip = "ZIP code is required";
      else if (!/^\d{5}(-\d{4})?$/.test(zip)) errors.zip = "ZIP code is invalid";
    }

    dispatch({ type: "SET_ERRORS", payload: errors });
    return Object.keys(errors).length === 0;
  }, [step, state]);

  // Memoize progress percent
  const progress = useMemo(() => ((step - 1) / 2) * 100, [step]);

  // Navigation handlers
  const nextStep = () => {
    if (validateStep()) {
      dispatch({ type: "CLEAR_ERRORS" });
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    dispatch({ type: "CLEAR_ERRORS" });
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Handle form submission on step 3
  const handleSubmit = () => {
    if (validateStep()) {
      setIsSubmitted(true);
    }
  };

  // Memoized update handlers
  const updatePersonalInfo = useCallback(
    (data) => dispatch({ type: "UPDATE_PERSONAL_INFO", payload: data }),
    []
  );

  const updateAddress = useCallback(
    (data) => dispatch({ type: "UPDATE_ADDRESS", payload: data }),
    []
  );

  return (
    <div>
      <div
        style={{
          height: "10px",
          background: "#e0e0e0",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            height: "10px",
            width: `${progress}%`,
            background: "#4caf50",
            borderRadius: "5px",
            transition: "width 0.3s ease-in-out",
          }}
        ></div>
      </div>

      {!isSubmitted ? (
        <>
          {step === 1 && (
            <Step1
              data={state.personalInfo}
              errors={state.errors}
              update={updatePersonalInfo}
              inputRef={step1Ref}
            />
          )}
          {step === 2 && (
            <Step2
              data={state.address}
              errors={state.errors}
              update={updateAddress}
              inputRef={step2Ref}
            />
          )}
          {step === 3 && (
            <Step3 data={{ ...state.personalInfo, ...state.address }} />
          )}

          <div style={{ marginTop: "20px" }}>
            {step > 1 && (
              <button type="button" onClick={prevStep}>
                Back
              </button>
            )}
            {step < 3 && (
              <button type="button" onClick={nextStep} style={{ marginLeft: "10px" }}>
                Next
              </button>
            )}
            {step === 3 && (
              <button type="button" onClick={handleSubmit} style={{ marginLeft: "10px" }}>
                Submit
              </button>
            )}
          </div>
        </>
      ) : (
        <div>
          <h2>Success!</h2>
          <p>Your form has been submitted with the following data:</p>
          <pre>{JSON.stringify({ ...state.personalInfo, ...state.address }, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
