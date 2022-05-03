import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import trackReducer from "./reducers/tracksReducer";
import genresReducer from "./reducers/adminReducers/genreReducers";
import authorReducer from "./reducers/adminReducers/authorReducers";
import adminTracksReducer from "./reducers/adminReducers/trackReducer";
import userTracksReducer from "./reducers/userReducers/trackReducer";
import playlistsReducer from "./reducers/userReducers/playlistReducer";
import usersPlaylistsReducer from "./reducers/adminReducers/usersPlaylistsReducers";
import albumsReducer from "./reducers/adminReducers/albumReducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  tracks: trackReducer,
  genres: genresReducer,
  authors: authorReducer,
  adminTracks: adminTracksReducer,
  userTracks: userTracksReducer,
  userPlaylists: playlistsReducer,
  users_playlists: usersPlaylistsReducer,
  albums: albumsReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
