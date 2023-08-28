# ![](./src/assets/rocket.svg) Challenge 2.0

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

- Organizar los datos, a la estructura requerida para el POST, que es un JSON de la siguiente forma:

```javascript
{
  name: string;
  email: string;
  phone: string;
}
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
