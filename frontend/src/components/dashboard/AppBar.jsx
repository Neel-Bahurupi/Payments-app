import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../config";

function AppBar() {
  const [balance, setBalance] = useState(0);
  const [userName, setUsername] = useState("User");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const response = await fetch(`${apiUrl}account/balance`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const response2 = await fetch(`${apiUrl}user/userInfo`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      const userData = await response2.json();

      setBalance(Math.floor(Number(data)));
      setUsername(userData.firstName);
    })();
  }, []);

  return (
    <div className="flex justify-between items-center p-4 border border-b-gray-200">
      <h1 className="font-bold text-lg">Paytments App</h1>
      <div>
        <span className="mr-4">Balance : {balance}</span>
        <span className="text-sm">Hello, {userName}</span>
        <button
          onClick={() => {
            logout();
            navigate("/signin");
          }}
          className="border ml-5 px-2 py-1 font-semibold hover:bg-gray-300 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AppBar;
