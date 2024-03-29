export const rootApi =
  "https://music-platform-react-nodejs.herokuapp.com" ||
  "http://localhost:5000";

const apiRoutes = {
  auth: {
    registration: `${rootApi}/auth/registration`,
    login: `${rootApi}/auth/login`,
    refresh: `${rootApi}/token/refresh`,
    logout: `${rootApi}/auth/logout`,
  },
  tracks: {
    getAll: `${rootApi}/track/getAll`,
    search: `${rootApi}/track/search`,
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
    users_playlists: {
      getAll: "/playlist/getUsersPlaylists",
      deletePlaylist: "/playlist/deletePlaylist",
    },
    albums: {
      getAll: "/album/getAll",
      new: "/album/new",
      addNewTracksToAlbum: "album/addNewTracksToAlbum",
      deleteTrackFromAlbum: "/album/delete",
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
      getTracks: "/playlist/getPlayListTracks",
      new: "/playlist/new",
      newTrack: "/playlist/addTrackToPlaylists",
      delete: "/playlist/delete",
      deleteTrack: "/playlist/deleteTrack",
    },
  },
};

export default apiRoutes;
