import { useEffect, useState } from "react";
import { getItems } from "../services/Contacts.service";
import { DataViewComponent } from "../components/dataView.component";
import { AddFile } from "../components/addFile.component";
import Loading from "../assets/loading.svg";
import { Contact } from "../model/contacts.model";

export const ContactList = () => {
  const [items, setItems] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    setLoading(true);
    getItems()
      .then((res) => setItems(res?.items))
      .finally(() => setLoading(false));
  }, [loadingUpdate]);

  return (
    <div className="w-full h-full flex justify-center">
      {loading && loadingUpdate ? (
        <div className="h-full w-full flex justify-center items-center">
          <figure>
            <img src={Loading} alt="loading" />
          </figure>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-y-6 justify-items-center w-4/6 p-6 h-fit rounded-3xl shadow-lg border bg-white">
          <AddFile setLoading={setLoadingUpdate} />
          {items?.length > 0 && <DataViewComponent items={items} />}
        </div>
      )}
    </div>
  );
};
