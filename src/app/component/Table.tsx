
import React from "react";

interface TableColumn {
  label: string;
  key: string;
  align?: "left" | "center" | "right";
  width?: string;
}

interface TableRow {
  id: string | number;
  [key: string]: any;
}

interface TableProps {
  columns: TableColumn[];
  rows: TableRow[];
  onRemoveRow?: (id: string | number) => void;
  onEditRow?: (id: string | number) => void; 
  onRowClick?: (id: string | number) => void;
}

const Table: React.FC<TableProps> = ({ columns, rows, onRemoveRow, onEditRow, onRowClick }) => {
    const handleRowClick = (id: string | number) => {
        onRowClick?.(id);
    };

    return (
      <div className="overflow-x-auto w-full !text-[14px]">
        <table className="w-full border-collapse table-auto !text-[14px]">
          <thead>
            <tr className="bg-[#f6f6f6]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`border px-2 py-1 text-${column.align || "left"} whitespace-nowrap`}
                  style={{ width: column.width || "auto" }}
                >
                  {column.label}
                </th>
              ))}
              {(onRemoveRow || onEditRow) && (
                <th className="border px-2 py-1 text-center whitespace-nowrap">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows?.map((row, index) => (
              <tr 
                key={row.id || index} 
                className="border-b"
                onClick={() => handleRowClick(row.id)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`border px-2 py-1 text-${column.align || "left"} whitespace-nowrap`}
                    style={{ width: column.width || "auto" }}
                  >
                    {row[column.key]}
                  </td>
                ))}
                {(onRemoveRow || onEditRow) && (
                  <td className="border px-2 py-1 text-center flex gap-2 justify-center">
                    {onEditRow && (
                      <button
                        onClick={() => onEditRow(row.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <i className="pi pi-pencil"></i>
                      </button>
                    )}
                    {onRemoveRow && (
                      <button
                        onClick={() => onRemoveRow(row.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="pi pi-trash"></i>
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default Table;

