const rootApi = "http://localhost:5000";

const apiRoutes = {
  auth: {
    registration: `${rootApi}/auth/registration`,
    login: `${rootApi}/auth/login`,
  },
};

export default apiRoutes;
