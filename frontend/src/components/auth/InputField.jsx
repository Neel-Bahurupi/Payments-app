import React from "react";

function InputField({ label, name, value, type, onChange }) {
  return (
    <div className="flex flex-col text-left my-2">
      <div className="font-medium text-sm">{label}</div>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        required
        className="border rounded-md h-8 my-1 px-2 text-sm text-gray-500"
      />
    </div>
  );
}

export default InputField;
