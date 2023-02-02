import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import Swal from "sweetalert2";
import { deleteUser } from "../features/UsersSlice";

const UsersPage = () => {
  const users = useSelector((state) => state.users.usersList);
  const dispatch = useDispatch();
  const handleEdit = (rowToEdit) => {
    console.log(rowToEdit);
  };

  const handleDelete = (rowToDelete) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        dispatch(deleteUser(rowToDelete));
        console.log("DELETED: ", rowToDelete);
      }
    });
  };

  const COLUMNS = [
    {
      Header: "Name",
      accessor: "name",
      // disableFilters: true,
      sticky: "left",
    },
    {
      Header: "Email",
      accessor: "email",
      sticky: "left",
    },
    {
      Header: "Username",
      accessor: "username",
      sticky: "left",
    },
    {
      Header: "Mobile",
      accessor: "mobile",
    },
    {
      Header: "Role Key",
      accessor: "roleKey",
    },
    {
      Header: "Password",
      accessor: "password",
    },
    {
      Header: "Edit",
      Cell: (cell) => {
        return (
          <button
            onClick={() => handleEdit(cell?.row?.original)}
            className="btn btn-info"
          >
            Edit
          </button>
        );
      },
    },
    {
      Header: "Delete",
      Cell: (cell) => {
        return (
          <button
            onClick={() => handleDelete(cell?.row?.original)}
            className="btn btn-error"
          >
            Delete
          </button>
        );
      },
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => users, [users]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <main className="w-screen h-auto bg-base-300">
      <h1 className="text-center text-4xl py-6">Users Page</h1>

      <div className="w-full flex justify-between px-4">
        <h1 className="text-xl">User table</h1>
        <h1 className="btn btn-primary">Add User</h1>
      </div>

      {/* table */}
      <div className="overflow-x-auto mt-4 mx-4">
        <table className="table w-full" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default UsersPage;
