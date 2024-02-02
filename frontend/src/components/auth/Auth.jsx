import React from "react";
import Signup from "./Signup";
import Signin from "./Signin";

function Auth({ type }) {
  return (
    <div className="flex justify-center items-center h-screen text-center bg-slate-50">
      <div className="shadow-md">
        {type == "singup" ? (
          <div style={{ width: "400px" }}>
            <Signup />
          </div>
        ) : (
          <div style={{ width: "400px" }}>
            <Signin />
          </div>
        )}
      </div>
    </div>
  );
}

export default Auth;
