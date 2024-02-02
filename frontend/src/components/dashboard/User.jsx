import React, { useState } from "react";
import Modal from "./Modal";

function User({ firstName, lastName, userId }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-md">
        <span>
          {firstName} {lastName}
        </span>
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="bg-black text-white text-xs p-2 rounded-md"
        >
          Send Money
        </button>
      </div>
      {showModal && (
        <Modal
          name={firstName}
          userId={userId}
          showModal={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default User;
