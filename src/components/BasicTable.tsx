"use client";

// -> Beyond codebase
import {
  useReactTable, type ColumnDef, flexRender, getCoreRowModel, createColumnHelper
} from "@tanstack/react-table";
import { useMemo } from "react";
import { DateTime } from "luxon";
// -> Within codebase
import mockData from "@/static-data/mock-data.json";

const dataObj = {
  "id": 1,
  "first_name": "Isador",
  "last_name": "Kruger",
  "email": "ikruger0@huffingtonpost.com",
  "gender": "Male",
  "dob": "2023-04-28T11:19:35Z"
};

type DataShape = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  dob: string;
  // getCoreRowModel
}

const BasicTable = () => {
  const tableData = useMemo(() => mockData, []);
  const columnHelper = createColumnHelper<DataShape>();

  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      header: () => "ID",
      cell: (rowData) => rowData.getValue(),
      footer: () => "ID",
    }),
    columnHelper.accessor("first_name", {
      id: "first_name",
      header: () => "First Name",
      cell: (rowData) => rowData.getValue(),
      footer: () => "First Name",
    }),
    columnHelper.accessor("last_name", {
      id: "last_name",
      header: () => "Last Name",
      cell: (rowData) => rowData.getValue(),
      footer: () => "Last Name",
    }),
    // {
    //   header: "Name",
    //   accessorFn: (rowData: DataShape) => `${rowData.first_name} ${rowData.last_name}`,
    // },
    columnHelper.accessor("email", {
      id: "email",
      header: () => "Email",
      cell: (rowData) => rowData.getValue(),
      footer: () => "Email",
    }),
    columnHelper.accessor("gender", {
      id: "gender",
      header: () => "Gender",
      cell: (rowData) => rowData.getValue(),
      footer: () => "Gender",
    }),
    columnHelper.accessor("dob", {
      id: "dob",
      header: () => "Date of Birth",
      cell: (rowData) => DateTime.fromISO(rowData.getValue()).toLocaleString(DateTime.DATE_MED), 
      footer: () => "Date of Birth",
    }),
  ];

  const table = useReactTable<DataShape>({ data: tableData, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="w3-container">
      <table className="w3-table-all" style={{ color: "black" }}>
        <thead>
          {
            table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {
                  headerGroup.headers.map((header) => (
                    <th key={header.id}>
                        {
                          (header.isPlaceholder) ? null : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody>
          {
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {
                  row.getVisibleCells().map((cell) => (
                    <td key={row.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
        <tfoot>
          {
            table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {
                  footerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {
                        header.isPlaceholder ? null : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </tfoot>
      </table>
    </div>
  )
}

export default BasicTable