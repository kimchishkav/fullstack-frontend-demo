import axios from "axios";

const API_URL = "https://fullstack-backend-demo-1.onrender.com/api/cars";

const getToken = () => sessionStorage.getItem("jwt");

export const getCars = async () => {
  const response = await axios.get(API_URL, {
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

export const addCar = async (car) =>
  axios.post(API_URL, car, {
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
    },
  });

export const updateCar = async (selfHref, car) =>
  axios.put(selfHref, car, {
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
    },
  });

export const deleteCar = async (selfHref) =>
  axios.delete(selfHref, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
