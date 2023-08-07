import axios from "axios";

// const BASE_URL = "http://localhost:5000/";

const BASE_URL = "https://curiousone.online/"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// axiosInstance.defaults.headers.common["Content-Type"] = "application/json";


// axiosInstance.interceptors.response.use(
//   (response) => {
//     // Handle successful responses
//     return response;
//   },
//   (error) => {
//     // Handle error responses
//     if (error.response && error.response.status === 401) {
//       console.log("herea at logout")
//       // If the response status is 401 (Unauthorized), log out the user
//       document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

//       localStorage.clear('user');
      

//       // If using cookies, clear them as well
//       // document.cookie = "your_cookie_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

//       // Redirect the user to the login page or perform any other logout actions
//       // For example, if using React Router:
//       // window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
