import axios from "axios";

const API_URL = "http://localhost:8000/api/";

const registerStaff = (surname, other_names, date_of_birth, image_src) => {
  return axios.post(API_URL + "staff", {
    surname,
    other_names,
    date_of_birth,
    image_src
  })
  .then((response) => {
    return response.data;
  }, (error) => {
    console.log(error);
    return error;
  });
};

const getStaffById = (staffId) => {
  return axios.get(API_URL + "staff/" + staffId)
    .then((response) => {
      return response.data.data;
  });
};

const staffService = {
  registerStaff,
  getStaffById,
};

export default staffService;