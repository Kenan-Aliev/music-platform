import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./views/Main/Main";
import Auth from "./views/Auth/Auth";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";

function App() {
  const isAuth = false;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route
              path="auth"
              element={isAuth ? <Navigate to="/" /> : <Auth />}
            >
              <Route path="registration" element={<Registration />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer
          autoClose={5000}
          theme={"colored"}
          transition={Flip}
          pauseOnHover={false}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
