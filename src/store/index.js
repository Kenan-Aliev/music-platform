import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import trackReducer from "./reducers/tracksReducer";
import genresReducer from "./reducers/adminReducers/genreReducers";
import authorReducer from "./reducers/adminReducers/authorReducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  tracks: trackReducer,
  genres: genresReducer,
  authors: authorReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
