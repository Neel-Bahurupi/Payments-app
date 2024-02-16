import React, { useState } from "react";
import { showToast } from "../common/Toast";
import { apiUrl } from "../../config";

function Modal({ name, userId, showModal, onClose }) {
  const [amount, setAmount] = useState(0);

  async function handleInitiateTransfer(e) {
    e.preventDefault();
    e.currentTarget.disabled = true;

    if (amount <= 0) {
      e.currentTarget.disabled = false;
      return showToast("Please enter a valid amount");
    }
    const payload = {
      amount: Number(amount),
      to: userId,
    };
    const response = await fetch(`${apiUrl}/account/transfer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    const { message } = await response.json();
    if (response.ok) {
      showToast(message, true);
      onClose();

      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } else {
      e.currentTarget.disabled = false;
      showToast(message);
    }
  }

  if (!showModal) {
    return null;
  }

  return (
    <form className="absolute top-0 left-0 flex justify-center content-center w-screen h-screen">
      <div className="relative flex flex-col justify-center content-center">
        <div
          className="border rounded-lg shadow-lg bg-white py-5 px-10 flex flex-col gap-4"
          style={{ width: "400px" }}
        >
          <h2 className="text-center font-bold text-xl">Send Money</h2>
          <span className="font-semibold text-lg">{name}</span>
          <div>Amount (in Rs)</div>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-1"
          />
          <button
            onClick={handleInitiateTransfer}
            className="bg-green-400 text-white rounded-md p-1"
            type="submit"
          >
            Initiate Transfer
          </button>
          <button
            className="absolute right-5 text-xl px-2 text-gray-600"
            onClick={onClose}
          >
            x
          </button>
        </div>
      </div>
    </form>
  );
}

export default Modal;
