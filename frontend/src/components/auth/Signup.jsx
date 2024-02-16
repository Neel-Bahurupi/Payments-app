import React, { useState } from "react";
import InputField from "./InputField";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";
import { Toast, showToast } from "../common/Toast";
import { apiUrl } from "../../config";

function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function onChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const response = await fetch(`${apiUrl}user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify(formData).length.toString(),
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      const token = data.token;
      login(token);
      navigate("/");
    } else {
      showToast(data.message);
    }

    setLoading(false);
  }

  return (
    <Toast>
      <form className="bg-white p-6 rounded-lg" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <div className="text-sm text-gray-600 mt-2 mb-5 mx-2">
          Enter your information to create an account
        </div>
        <InputField
          label={"Email"}
          name={"email"}
          type={"email"}
          value={formData.email}
          onChange={onChange}
        />
        <InputField
          label={"First Name"}
          name={"firstName"}
          type={"text"}
          value={formData.firstname}
          onChange={onChange}
        />
        <InputField
          label={"Last Name"}
          name={"lastName"}
          type={"text"}
          value={formData.lastName}
          onChange={onChange}
        />
        <InputField
          label={"Password"}
          name={"password"}
          type={"password"}
          value={formData.password}
          onChange={onChange}
        />
        <button
          className=" w-full bg-black text-center text-white text-sm h-8 rounded-md mt-3"
          type="submit"
        >
          Sign Up
        </button>

        <div className="mt-4">
          Already have an account? <Link to="/signin">Login</Link>
        </div>

        {loading && <LoadingSpinner />}
      </form>
    </Toast>
  );
}

export default Signup;
