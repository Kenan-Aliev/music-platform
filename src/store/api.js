export const rootApi = "http://localhost:5000";

const apiRoutes = {
  auth: {
    registration: `${rootApi}/auth/registration`,
    login: `${rootApi}/auth/login`,
    refresh: `${rootApi}/token/refresh`,
    logout: `${rootApi}/auth/logout`,
  },
  tracks: {
    getALl: `${rootApi}/track/getAll`,
    addMusicToTrackList: `/track/addToTrackList`,
    getMyTracks: `/track/getMyTracks`,
  },
  admin: {
    genres: {
      getAll: "/genre/getAll",
      new: "/genre/create",
    },
    authors: {
      getAll: "/author/getAll",
      new: "/author/create",
    },
  },
};

export default apiRoutes;
