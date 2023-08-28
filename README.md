# ![](./src/assets/rocket'mini.svg) Challenge 2.0

Es una UI web, para subir una lista de contactos de un archivo CSV a un API y no perder ningun dato.

## Detalles

- Posee un input tipo file, para ingresar el archivo CSV.
- El archivo debe poseer los siguientes datos:

  - Nombre
  - Teléfono
  - Correo electrónico

- Previsualización de datos del archivo.
- Un botón que permite cargar los datos del csv al api (POST).
- Un botón que permite eliminar el archivo subido, en caso de error.
- Visualización de los datos subidos al servidor (GET).
- Header.
- Footer.

## Dificultades

- En un principio extraer los datos del archivo, lo cual solucioné usando

```javascript
const reader = new FileReader();
```

- Organizar los datos, a la estructura requerida para el POST, que es un JSON por cada usuario que debe poseer las propiedades name, email y phone, esto lo solucioné primero creando un array con ayuda de split para posteriormente ejecutar un forEach para crear el Array de objetos con las propiedades requeridas:

```javascript
const parseCSV = (text: string) => {
  const lines = text?.replace(/\r/g, "").split("\n");
  return lines?.map((line) => line.split(","));
};

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
```

- Y por último, se debe enviar un POST por cada usuario a la vez, al terminar un POST hacer el siguiente porque arroja el error: Servidor No disponible. Para ello implementé un función recursiva, para que hiciera un POST y luego que termine ejecutara el que sigue, hasta terminar con el último usuario.

```javascript
const submitItems = async (
  arrayItems: Contact[]
): Promise<PostContact | undefined> => {
  setLoading(true);
  if (arrayItems.length > 0) {
    await postItems(arrayItems[0])
      .then(() =>
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "El archivo fue procesado correctamente",
          life: 3000,
        })
      )
      .catch(() => {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Ha ocurrido un error, por favor intentelo de nuevo",
          life: 3000,
        });
        throw new Error();
      });
    arrayItems.shift();
    return submitItems(arrayItems);
  }
  setLoading(false);
  return;
};
```

## Correr el proyecto

```shell
npm i
npm run dev
```
