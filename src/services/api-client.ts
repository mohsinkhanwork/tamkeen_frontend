import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: "http://tamkeen_center.test:81/api.tamkeen.center/public/api",     //locahost is: http://tamkeen_center.test:81/api.tamkeen.center/public/api
  headers: {                                        // server is: https://api.tamkeen.center/api/             
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response, // If the response is successful, just return it
  (error) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove("token");
      Cookies.remove("user");

      // Get the current pathname
      const currentPath = window.location.pathname;

      // Redirect to /login only if the user is not on the home page
      if (currentPath !== "/") {
        window.location.href = "/login";
      } else {
        console.error("401 Unauthorized - staying on home page");
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
