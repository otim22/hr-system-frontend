import axios from "axios";

const API_URL = "http://localhost:8000/api/";

const registerAccount = (name, email, password) => {
  return axios.post(API_URL + "register", {
    name,
    email,
    password
  })
  .then((response) => {
    return response.data;
  }, (error) => {
    console.log(error);
    return error;
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }
      return response.data;
    }, (error) => {
      console.log(error);
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  registerAccount,
  login,
  logout,
};

export default authService;