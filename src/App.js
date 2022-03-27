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
import Admin from "./views/Admin/Admin";
import Musics from "./views/Admin/Musics/Musics";
import Authors from "./views/Admin/Authors/Authors";
import Genres from "./views/Admin/Genres/Genres";
import PlayLists from "./views/Admin/PlayLists/PlayLists";
import User from "./views/User/User";
import MyPlayLists from "./views/User/MyPlayLists/MyPlayLists";

function App() {
  const dispatch = useDispatch();

  const isAuth = useSelector((s) => s.auth.login.success);
  const isAdmin = useSelector((s) => s.auth.user.isAdmin);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route
              index
              element={<Tracks isPlayList={false} isUserTracks={false} />}
            />
            <Route
              path="auth"
              element={isAuth ? <Navigate to="/" /> : <Auth />}
            >
              <Route path="registration" element={<Registration />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route
              path="user"
              element={isAuth ? <User /> : <Navigate to="/" />}
            >
              <Route
                path="myTracks"
                element={<Tracks isPlayList={false} isUserTracks={true} />}
              />
              <Route path="myPlaylists" element={<MyPlayLists />} />
            </Route>
            <Route
              path="admin"
              element={isAuth && isAdmin ? <Admin /> : <Navigate to={"/"} />}
            >
              <Route path="musics" element={<Musics />} />
              <Route path="genres" element={<Genres />} />
              <Route path="authors" element={<Authors />} />
              <Route path="playlists" element={<PlayLists />} />
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
