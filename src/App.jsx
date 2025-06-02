import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Features/SignUp";
import MainPage from "./Features/MainPage";
import LogIn from "./Features/LogIn";
import ProtectedRoute from "./Utilities/ProtectedRoute";
import DashBoard from "./Features/DashBoard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/LogIn" element={<LogIn />}></Route>
          <Route
            path="/DashBoard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
