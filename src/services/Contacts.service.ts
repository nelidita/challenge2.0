import axios from "axios";
import { Contact, ContactList, PostContact } from "../model/contacts.model";
import { baseURL } from "../constants/url";

export const getItems = async (): Promise<ContactList> => {
  return await axios
    .get(baseURL)
    .then((res) => res.data)
    .catch((error) => console.error(error));
};

export const postItems = async (payload: Contact): Promise<PostContact> => {
  return await axios
    .post(baseURL, payload)
    .then((res) => res.data)
    .catch((error) => console.error(error));
};
