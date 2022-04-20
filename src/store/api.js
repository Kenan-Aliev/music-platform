export const rootApi = "http://localhost:5000";

const apiRoutes = {
  auth: {
    registration: `${rootApi}/auth/registration`,
    login: `${rootApi}/auth/login`,
    refresh: `${rootApi}/token/refresh`,
    logout: `${rootApi}/auth/logout`,
  },
  tracks: {
    getAll: `${rootApi}/track/getAll`,
  },
  admin: {
    genres: {
      getAll: "/genre/getAll",
      new: "/genre/create",
      delete: "/genre/delete",
    },
    authors: {
      getAll: "/author/getAll",
      new: "/author/create",
      delete: "/author/delete",
    },
    tracks: {
      getAll: `${rootApi}/track/getAll`,
      new: "/track/create",
      delete: "/track/delete",
    },
  },
  user: {
    tracks: {
      getAll: "/track/getMyTracks",
      addMusicToTrackList: `/track/addToTrackList`,
      deleteMusicFromTrackList: "/track/deleteTrackFromTrackList",
    },
    playlists: {
      getAll: "/playlist/getMyPlaylists",
    },
  },
};

export default apiRoutes;
