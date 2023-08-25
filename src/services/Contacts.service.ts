import axios from "axios";
import { baseURL } from "../constants/url";

export const getItems = async () => {
  await axios
    .get(baseURL)
    .then((res) => res.data)
    .catch((error) => console.error(error));
};

export const postItems = async () => {
  await axios
    .post(baseURL)
    .then((res) => res.data)
    .catch((error) => console.error(error));
};
