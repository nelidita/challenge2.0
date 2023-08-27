import { DataTable, DataTableValue } from "primereact/datatable";
import { Column } from "primereact/column";

type TableProps = {
  items: DataTableValue[];
};

const TableComponent = ({ items }: TableProps): JSX.Element => {
  const style = { padding: "12px" };
  return (
    <div className="flex flex-col gap-y-4 items-center w-full">
      <h1 className="font-black text-xl">Vista previa</h1>
      <DataTable
        value={items}
        emptyMessage="No hay datos disponibles"
        className="border rounded-lg w-full"
      >
        <Column
          header="#"
          align="center"
          style={style}
          body={(_, { rowIndex }): string | number => rowIndex + 1}
        />
        <Column field="name" header="Nombre" style={style} />
        <Column field="phone" header="Teléfono" style={style} />
        <Column field="email" header="Correo electrónico" style={style} />
      </DataTable>
    </div>
  );
};

export default TableComponent;
