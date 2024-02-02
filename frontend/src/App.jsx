import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Auth from "./components/auth/Auth";
import { AuthProvider } from "./context/AuthContext";
import { Toast } from "./components/common/Toast";

function App() {
  return (
    <AuthProvider>
      <Toast>
        <div className="md:w-3/4 m-auto">
          <Routes>
            <Route path="/signin" element={<Auth type={"signin"} />} />
            <Route path="/signup" element={<Auth type={"singup"} />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Toast>
    </AuthProvider>
  );
}

export default App;
