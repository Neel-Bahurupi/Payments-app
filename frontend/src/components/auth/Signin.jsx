import React, { useState } from "react";
import InputField from "./InputField";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";
import { showToast } from "../common/Toast";
import { apiUrl } from "../../config";

function Signin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
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

    const response = await fetch(`${apiUrl}user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify(formData).length.toString(),
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      login(data.token);
      navigate("/");
    } else {
      showToast(data.message);
    }

    setLoading(false);
  }

  return (
    <form className="bg-white p-6 rounded-lg" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold">Sign In</h1>
      <div className="text-sm text-gray-600 mt-2 mb-5 mx-2">
        Enter your credentials to access your account account
      </div>
      <InputField
        label={"Email"}
        name={"email"}
        type={"email"}
        value={formData.email}
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
        className=" w-full text-center bg-black text-white text-sm h-8 rounded-md mt-3"
        type="submit"
      >
        Sign In
      </button>
      <div className="mt-4">
        Don't have an account? <Link to="/signup">Signup</Link>
      </div>

      {loading && <LoadingSpinner />}
    </form>
  );
}

export default Signin;
