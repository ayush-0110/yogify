import React, { useState } from "react";
import { times } from "./timeslots";
import Modal from "../common/modal";
import axios from 'axios';
import { toast } from "react-toastify";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [time, setTime] = useState(0);
  const [phone, setPhone] = useState(0);
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState([]);
  const validateForm = () => {
    let errorMessages = [];
    const nameRegex = /^[A-Za-z ]+$/;
    if (!name) errorMessages.push("Name is required.");
    else if (!nameRegex.test(name)) {
      errorMessages.push("Name should contain only alphabets and spaces.");
    }
    if (age < 18 || age > 65)
      errorMessages.push("Age must be between 18 and 65.");
    if (time === 0 || time === "--Select") errorMessages.push("Select a batch");
    if (!phone.match(/^[1-9][0-9]{9}$/)) {
      errorMessages.push(
        "Contact no. must be 10 digits and must not start with 0."
      );
    }
    return errorMessages;
  };

  const capitalizeWords = (str) => {
    return str
      .trim()
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedName = capitalizeWords(name);
    setName(formattedName);
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsError(true);
      return;
    } else {
      
      setIsError(false);
      const userData = {
        name: formattedName,
        age: age,
        phone: phone,
        timeSlot: time
      };

      try {
        const apiBaseUrl = process.env.REACT_APP_API_URL;
        const response = await axios.post(`${apiBaseUrl}/api/users/register`, userData);
        
        toast.success('Registration successful!', {
          position: toast.POSITION.TOP_CENTER
        });
      } catch (error) {
        if (error.response && error.response.data) {
          // Handle server-side validation errors
          setErrors([error.response.data.message]);
          setIsError(true);
        } else {
          // Handle other errors like network issues
          toast.error("An error occurred. Please try again.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000
          });
        }
      }
    }
  };
  return (
    <div className="detailsform fade-in">
      {isError && <Modal setIsError={setIsError} errorlist={errors} />}
      <div className="headdiv">
        <h1 className="heading">Registration Form</h1>
      </div>
      <form className="form">
        <label className="label" htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          className="input"
          onPaste={(e) => {
            e.preventDefault();
            toast.error(`This functionality is not allowed`, {
              duration: 3000,
              isClosable: true,
              position: toast.POSITION.TOP_CENTER,
            });
          }}
          id="name"
          required
          placeholder="John Doe"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label className="label" htmlFor="phone">
          Contact No.:
        </label>
        <input
          type="tel"
          className="input"
          onPaste={(e) => {
            e.preventDefault();
            toast.error(`This functionality is not allowed`, {
              duration: 3000,
              isClosable: true,
              position: toast.POSITION.TOP_CENTER,
            });
          }}
          id="phone"
          required
          placeholder="1234567899"
          maxLength="10"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          onKeyDown={(e) => {
            if (
              (e.key >= "0" && e.key <= "9") ||
              e.key === "Backspace" ||
              e.key === "Delete" ||
              e.key === "ArrowLeft" ||
              e.key === "ArrowRight"
            ) {
              return;
            } else {
              e.preventDefault();
            }
          }}
        />
        <label className="label" htmlFor="age">
          Age(in years):
        </label>
        <input
          className="input"
          id="age"
          placeholder="19"
          onPaste={(e) => {
            e.preventDefault();
            toast.error(`This functionality is not allowed`, {
              duration: 3000,
              isClosable: true,
              position: toast.POSITION.TOP_CENTER,
            });
          }}
          required
          onChange={(e) => {
            const valueWithoutLeadingZeros = e.target.value.replace(/^0+/, "");
            if (
              valueWithoutLeadingZeros !== "" &&
              valueWithoutLeadingZeros >= 0
            ) {
              setAge(parseInt(valueWithoutLeadingZeros, 10));
            } else {
              setAge(0);
            }
          }}
          onKeyDown={(e) => {
            if (
              (e.key >= "0" && e.key <= "9") ||
              e.key === "Backspace" ||
              e.key === "Delete" ||
              e.key === "ArrowLeft" ||
              e.key === "ArrowRight"
            ) {
              return;
            } else {
              e.preventDefault();
            }
          }}
        />
        <label className="label" htmlFor="time">
          Choose time slot:
        </label>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <select
            className="input"
            id="time"
            style={{ textAlign: "center" }}
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          >
            <option>--Select</option>
            {times.map((item, index) => {
              return <option key={index}>{item}</option>;
            })}
          </select>
        </div>
        <button type="submit" onClick={handleSubmit} className="btn1">
          Complete Payment (Rs. 500)
        </button>
      </form>
    </div>
  );
}
