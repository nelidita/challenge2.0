import { useState } from "react";
import {
  FileUpload,
  FileUploadSelectEvent,
  ItemTemplateOptions,
} from "primereact/fileupload";
import { Tag } from "primereact/tag";
import { postItems } from "../services/Contacts.service";
import TableComponent from "./table.component";
import Add from "../assets/add.svg";
import { Contact, PostContact } from "../model/contacts.model";

type AddFileProps = {
  setLoading: (loading: boolean) => void;
};

export const AddFile = ({ setLoading }: AddFileProps): JSX.Element => {
  const [dataFile, setDataFile] = useState<Contact[]>([]);
  const [file, setFile] = useState<File>();
  const onClear = () => setDataFile([]);

  const handleChange = (e: FileUploadSelectEvent) => {
    if (e.files) setFile(e.files[0]);
    const file = e?.files?.[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const lines = parseCSV(String(e?.target?.result));
      const matrix = lines.filter((line) => line.length > 1);
      const dataItems: Contact[] = [];
      matrix.forEach((values: string[]) => {
        let phoneNumber = values[1];
        if (phoneNumber.length < 10) phoneNumber = "0" + phoneNumber;
        let formatPhone = "";
        for (let i = 0; i < phoneNumber.length; i++) {
          if (i % 3 == 0 && i > 0 && i < 7) {
            formatPhone += "-" + phoneNumber[i];
          } else {
            formatPhone += phoneNumber[i];
          }
        }
        dataItems.push({
          name: values[0],
          email: values[2],
          phone: formatPhone,
        });
      });
      setDataFile(dataItems);
    };
    if (file) reader.readAsBinaryString(file);
  };

  const handleUploadClick = async () => {
    if (!file) return;
    if (dataFile) await submitItems(dataFile);
  };

  const parseCSV = (text: string) => {
    const lines = text?.replace(/\r/g, "").split("\n");
    return lines?.map((line) => line.split(","));
  };

  const submitItems = async (
    arrayItems: Contact[]
  ): Promise<PostContact | undefined> => {
    setLoading(true);
    if (arrayItems.length > 0) {
      await postItems(arrayItems[0]);
      arrayItems.shift();
      return submitItems(arrayItems);
    }
    setLoading(false);
    return;
  };

  const emptyTemplate = () => (
    <section className="flex flex-col gap-y-4 items-center">
      <figure className="w-16">
        <img src={Add} alt="add" />
      </figure>
      <span>Arrastra y suelta el archivo aquí</span>
    </section>
  );

  const chooseOptions = {
    iconOnly: false,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };

  const uploadOptions = {
    iconOnly: false,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };

  const cancelOptions = {
    iconOnly: false,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };

  const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
    const file = inFile as File;
    return (
      <div className="flex flex-row items-center flex-wrap gap-x-3">
        <span className="flex flex-column text-left ml-3">{file.name}</span>
        <span>{new Date().toLocaleDateString()}</span>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2"
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-y-4 w-full">
      <FileUpload
        accept="File/*"
        className="w-full"
        headerClassName="flex justify-around"
        maxFileSize={1000000}
        onSelect={handleChange}
        customUpload
        uploadHandler={handleUploadClick}
        onClear={onClear}
        emptyTemplate={emptyTemplate}
        itemTemplate={itemTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
        chooseLabel="Selecciona un archivo"
        uploadLabel="Subir"
        cancelLabel="Cancelar"
      />
      {file && dataFile.length > 0 && <TableComponent items={dataFile} />}
    </div>
  );
};
