import { DataTableValue } from "primereact/datatable";
import { DataView } from "primereact/dataview";
import { Contact } from "../model/contacts.model";
import Arrow from "../assets/arrow.svg";

type DataViewProps = {
  items: DataTableValue[];
};

export const DataViewComponent = ({ items }: DataViewProps) => {
  const itemTemplate = (item: Contact) => {
    return (
      <div className="flex flex-row p-3 gap-4 border-b border-teal-100 hover:bg-red-100 rounded-2xl">
        <figure className="w-6">
          <img src={Arrow} alt="arrow" />
        </figure>
        <div className="flex flex-row justify-content-between align-items-center gap-4">
          <span>{item.name}</span>
          <span>{item.phone}</span>
          <span>{item.email}</span>
        </div>
      </div>
    );
  };

  return (
    <section className="flex flex-col gap-y-4 items-center w-full">
      <h1 className="font-black text-xl">Lista de contactos</h1>
      <DataView
        value={items}
        itemTemplate={itemTemplate}
        className="w-full border border-indigo-400 rounded-xl p-4"
      />
    </section>
  );
};
