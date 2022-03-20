import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./views/Main/Main";
import Auth from "./views/Auth/Auth";
import Login from "./components/Login/Login";
import Tracks from "./views/Tracks/Tracks";
import Registration from "./components/Registration/Registration";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "./store/actions/authActions";

function App() {
  const dispatch = useDispatch();

  const isAuth = useSelector((s) => s.auth.login.success);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Tracks />} />
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
          position="bottom-right"
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
