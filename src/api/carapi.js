import axios from "axios";

const BASE_URL = "https://fullstack-backend-demo-1.onrender.com"; // ОБЯЗАТЕЛЬНО с -1

const getToken = () => sessionStorage.getItem("jwt");

export const login = (user) => {
  return axios.post(`${BASE_URL}/login`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getCars = async () => {
  const response = await axios.get(`${BASE_URL}/api/cars`, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });

  const data = response.data;
  const cars = data._embedded ? data._embedded.cars : data;

  return cars.map((car, index) => ({
    ...car,
    id: index,
    selfHref: car._links?.self?.href,
  }));
};
