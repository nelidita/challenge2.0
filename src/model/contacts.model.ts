export type Contact = {
  name: string;
  email: string;
  phone: string;
};

export type ContactList = {
  count: string | number;
  items: Contact[];
};

export type PostContact = {
  count: string | number;
  items: Contact;
};
