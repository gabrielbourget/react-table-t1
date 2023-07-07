"use client";

import { DataShape } from "@/components/TablePage";
import {
  flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
  getSortedRowModel, useReactTable, type SortingState
} from "@tanstack/react-table";
import { useState } from "react";

type BasicTableProps = {
  data: any;
  columns: any;
}

const BasicTable = (props: BasicTableProps) => {
  const { data: tableData, columns } = props;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable<DataShape>({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="w3-container">
      <input type="text" value={filtering} onChange={(e) => setFiltering(e.target.value)} />
      <table className="w3-table-all" style={{ color: "black" }}>
        <thead>
          {
            table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {
                  headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                        {
                          (header.isPlaceholder) ? null :
                          <>
                            {
                              flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )
                            }
                            {
                              { "asc": "↑", "desc": "↓" } [header.column.getIsSorted() as string ?? null]
                            }
                          </>
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
        {/* <tfoot>
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
        </tfoot> */}
      </table>
      <div style={{ marginTop: 15 }}></div>
      <div style={{ display: "flex"}}>
        <button onClick={() => table.setPageIndex(0)}>First Page</button>
        <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Prev Page</button>
        <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Next Page</button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Last Page</button>
      </div>
    </div>
  )
}

export default BasicTable