//this will take care of http requets
import axios from "axios";
const API_URL = "api/users/";

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  //axios puts response into object called data by default. So we check our local storage . We use JSON.stringify becasue we need to put strings in the local storage. In localstorage.setItem , first argument is the name and the other is the value ( key value pair) response.data includes our token.
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
