import { useEffect } from "react";
import { getItems } from "../services/Contacts.service";

export const ContactList = () => {
  useEffect(() => {
    getItems();
  }, []);

  return <div className="">Lista de contactos</div>;
};
