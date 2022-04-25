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
import EditPage from "./views/Admin/EditPage/EditPage";
import User from "./views/User/User";
import MyPlayLists from "./views/User/MyPlayLists/MyPlayLists";
import { getUserPlaylists } from "./store/actions/userActions/playlistActions";
import { getAllTracks } from "./store/actions/tracksAction";

function App() {
  const dispatch = useDispatch();

  const isAuth = useSelector((s) => s.auth.login.success);
  const isAdmin = useSelector((s) => s.auth.user.isAdmin);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(getAllTracks());
  }, []);

  useEffect(() => {
    if (isAuth && !isAdmin) {
      dispatch(getUserPlaylists());
    }
  }, [isAuth, isAdmin, dispatch]);

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
              <Route
                path="myPlaylists/:playlistID"
                element={<Tracks isPlayList={true} isUserTracks={false} />}
              />
            </Route>
            <Route
              path="admin"
              element={isAuth && isAdmin ? <Admin /> : <Navigate to={"/"} />}
            >
              <Route
                path="musics"
                element={
                  <EditPage
                    title={"Песни"}
                    isGenres={false}
                    isPlayLists={false}
                    isAuthors={false}
                    isTracks={true}
                  />
                }
              />
              <Route
                path="genres"
                element={
                  <EditPage
                    title={"Жанры"}
                    isGenres={true}
                    isPlayLists={false}
                    isAuthors={false}
                    isTracks={false}
                  />
                }
              />
              <Route
                path="authors"
                element={
                  <EditPage
                    title={"Авторы"}
                    isGenres={false}
                    isPlayLists={false}
                    isAuthors={true}
                    isTracks={false}
                  />
                }
              />
              <Route
                path="playlists"
                element={
                  <EditPage
                    title={"Плейлисты"}
                    isGenres={false}
                    isPlayLists={true}
                    isAuthors={false}
                    isTracks={false}
                  />
                }
              />
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
