import React, { useEffect, useState } from "react";
import User from "./User";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../config";
import LoadingSpinner from "../common/LoadingSpinner";

function Users() {
  const [users, setUsers] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function fetchUsers() {
    setLoading(true);
    const response = await fetch(`${apiUrl}user/bulk?filter=` + searchField, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();
    if (response.status === 200) {
      setUsers(data);
    } else if (response.status === 403) {
      navigate("/signin");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const debounceFn = setTimeout(function () {
      fetchUsers();
    }, 500);

    return () => clearTimeout(debounceFn);
  }, [searchField]);

  return (
    <div className="p-5">
      <h2 className=" font-semibold">Users</h2>
      <input
        type="text"
        placeholder="Search users"
        className="flex border w-full p-2 mb-5 text-sm my-2"
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
      />

      {loading ? (
        <LoadingSpinner />
      ) : users.length > 0 ? (
        users.map((user) => (
          <User
            key={user._id}
            firstName={user.firstName}
            lastName={user.lastName}
            userId={user._id}
          />
        ))
      ) : (
        <span>No data available</span>
      )}
    </div>
  );
}

export default Users;
