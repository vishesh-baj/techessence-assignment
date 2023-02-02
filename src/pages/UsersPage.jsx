import React, { useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import Swal from "sweetalert2";
import { deleteUser, editUser, addUser } from "../features/UsersSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import uuid from "react-uuid";

const UsersPage = () => {
  const users = useSelector((state) => state.users.usersList);
  const dispatch = useDispatch();
  const modalRef = useRef();
  const schema = yup.object({
    name: yup
      .string()
      .min(3, "minimun 3 characters required")
      .required("name is required"),
    email: yup
      .string()
      .email("enter a valid email")
      .required("email is required"),
    username: yup
      .string()
      .min(3, "minimum 3 characters required")
      .required("username is required"),
    mobile: yup
      .number("enter a valid mobile")
      .min(10, "minimum of 10 characters required")
      .required("mobile is required"),
    roleKey: yup.string().required("role key is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleEdit = (rowToEdit) => {
    console.log(rowToEdit);
  };
  const handleDelete = (rowToDelete) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "teal",
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

  const onSubmit = (userData) => {
    modalRef.current.checked = false;
    dispatch(addUser(userData));
    console.log("USER_DATA:", userData);
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
        <label htmlFor="my-modal" className="btn">
          add user
        </label>
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

      <input
        ref={modalRef}
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Enter User Details</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full p-4"
          >
            <input
              {...register("name")}
              placeholder="Name"
              className="input input-info"
              type="text"
              name="name"
              id="name"
            />
            <input
              {...register("email")}
              placeholder="Email"
              className="input input-info"
              type="email"
              name="email"
              id="email"
            />
            <input
              {...register("username")}
              placeholder="User Name"
              className="input input-info"
              type="text"
              name="username"
              id="username"
            />
            <input
              {...register("mobile")}
              placeholder="Mobile"
              className="input input-info"
              type="tel"
              name="mobile"
              id="mobile"
            />
            <input
              {...register("roleKey")}
              placeholder="Role Key"
              className="input input-info"
              type="text"
              name="roleKey"
              id="roleKey"
            />
            <input
              {...register("password")}
              placeholder="Password"
              className="input input-info"
              type="password"
              name="password"
              id="password"
            />
            <button
              typeof="button"
              htmlFor="my-modal"
              className="btn btn-primary"
            >
              Add User
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default UsersPage;
