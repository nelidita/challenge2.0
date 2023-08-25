import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ContactList } from "./pages/contactList.page.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ContactList />
  </React.StrictMode>
);
