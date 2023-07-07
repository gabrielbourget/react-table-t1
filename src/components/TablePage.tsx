// -> Beyond codebase
import BasicTable from '@/components/BasicTable';
import mockData from "@/static-data/mock-data.json";
// -> Within codebase
import { createColumnHelper } from '@tanstack/react-table';
import { DateTime } from "luxon";
import { useMemo } from 'react';

export type DataShape = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  dob: string;
}

export default function Home() {

  const columnHelper = createColumnHelper<DataShape>();

  const tableData = useMemo(() => mockData, []);
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
    // {
    //   header: "Name",
    //   columns: [
    //     columnHelper.accessor("first_name", {
    //       id: "first_name",
    //       header: () => "First",
    //       cell: (rowData) => rowData.getValue(),
    //       footer: () => "First",
    //     }),
    //     columnHelper.accessor("last_name", {
    //       id: "last_name",
    //       header: () => "Last",
    //       cell: (rowData) => rowData.getValue(),
    //       footer: () => "Last",
    //     }),
    //   ]
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

  return (
    <div>
      <BasicTable data={tableData} columns={columns} />
    </div>
  )
}
