import React, { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import Swal from "sweetalert2";
import { deleteRole, editRole, addRole } from "../features/RolesSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import uuid from "react-uuid";

const RolesPage = () => {
  const roles = useSelector((state) => state.roles.rolesList);
  const dispatch = useDispatch();
  const addRolesModalRef = useRef();
  const editRoleModalRef = useRef();
  const [rowToEdit, setRowToEdit] = useState();
  const schema = yup.object({
    roleLabel: yup
      .string()
      .min(3, "minimun 3 characters required")
      .required("role label is required"),
    roleKey: yup.string().required("role key is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleEditChange = (e) => {
    setRowToEdit({ ...rowToEdit, [e.target.name]: e.target.value });
    console.log(rowToEdit);
  };
  const handleEdit = (rowToEdit) => {
    editRoleModalRef.current.checked = true;
    setRowToEdit(rowToEdit);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editRoleModalRef.current.checked = false;
    dispatch(editRole(rowToEdit));
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
        dispatch(deleteRole(rowToDelete));
        console.log("DELETED: ", rowToDelete);
      }
    });
  };

  const onSubmit = (rolesData) => {
    // // disable modal
    addRolesModalRef.current.checked = false;
    dispatch(addRole({ id: uuid(), ...rolesData }));
    console.log("ROLE_DATA:", { id: uuid(), ...rolesData });
    // console.log("ACAS");
  };

  const COLUMNS = [
    {
      Header: "Role Label",
      accessor: "roleLabel",
      // disableFilters: true,
      sticky: "left",
    },
    {
      Header: "Role Key",
      accessor: "roleKey",
      sticky: "left",
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
  const data = useMemo(() => roles, [roles]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <main className="w-screen h-auto bg-base-300">
      <h1 className="text-center text-4xl py-6">Roles Page</h1>

      <div className="w-full flex justify-between px-4">
        <h1 className="text-xl">Role table</h1>
        <label htmlFor="add-role-modal" className="btn">
          add role
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
      {/* INPUT TOGGLE FOR ADD ROLE */}
      <input
        ref={addRolesModalRef}
        type="checkbox"
        id="add-role-modal"
        className="modal-toggle"
      />
      {/* MODAL FOR ADDING ROLE */}
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Enter Role Details</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full p-4"
          >
            <input
              {...register("roleLabel")}
              placeholder="Role Label"
              className="input input-info"
              type="text"
              name="roleLabel"
              id="roleLabel"
            />
            <p className="text-rose-500">{errors.roleLabel?.message}</p>
            <input
              {...register("roleKey")}
              placeholder="Role Key"
              className="input input-info"
              type="text"
              name="roleKey"
              id="roleKey"
            />
            <p className="text-rose-500">{errors.roleKey?.message}</p>
            <button type="submit" className="btn btn-primary">
              Add Role
            </button>
          </form>
        </div>
      </div>

      {/* INPUT TOGGLE FOR EDIT ROLE */}
      <input
        ref={editRoleModalRef}
        type="checkbox"
        id="edit-role-modal"
        className="modal-toggle"
      />
      {/* MODAL FOR EDITING ROLE */}
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Role Details</h3>
          <form
            onSubmit={(e) => handleEditSubmit(e)}
            className="flex flex-col gap-4 w-full p-4"
          >
            <input
              placeholder="Role Label"
              className="input input-info"
              type="text"
              name="roleLabel"
              id="editRoleLabel"
              onChange={(e) => handleEditChange(e)}
              value={rowToEdit?.roleLabel}
            />
            <input
              placeholder="Role Key"
              className="input input-info"
              type="text"
              name="roleKey"
              id="roleKey"
              onChange={(e) => handleEditChange(e)}
              value={rowToEdit?.roleKey}
            />
            <button className="btn btn-primary">Edit Role</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default RolesPage;
