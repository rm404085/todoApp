// src/components/table/DataTableDemo.tsx
import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } from "@/redux/endPoints/userApi";
import type { User } from "@/types/types";

export function DataTableDemo() {
  const { data: users, isLoading, error } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [filter, setFilter] = React.useState("");
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState<Partial<User>>({});

  // Edit handler
  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setFormData({ ...user }); // copy full user object
  };

  // Update handler
  const handleUpdate = async () => {
    if (editingId) {
      await updateUser({ id: editingId, ...formData });
      setEditingId(null);
    }
  };

  // Delete handler
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure to delete this user?")) {
      await deleteUser(id);
    }
  };

  // Filter users
  const filteredUsers = React.useMemo(() => {
    if (!users) return [];
    return users.filter(user =>
      `${user.name.firstname} ${user.name.lastname}`.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase())
    );
  }, [users, filter]);

  // Columns definition
  const columns: ColumnDef<User>[] = React.useMemo(() => [
    {
      accessorKey: "name",
      header: "Name",
      cell: info =>
        editingId === info.row.original.id ? (
      <div className="flex gap-2">
  <Input
    value={formData.name?.firstname ?? ""}
    onChange={e => {
      const updated = {
        ...formData,
        name: {
          firstname: e.target.value,
          lastname: formData.name?.lastname ?? "",
        },
      }
      console.log("Updated Firstname:", updated)
      setFormData(updated)
    }}
    placeholder="First Name"
  />
  <Input
    value={formData.name?.lastname ?? ""}
    onChange={e => {
      const updated = {
        ...formData,
        name: {
          firstname: formData.name?.firstname ?? "",
          lastname: e.target.value,
        },
      }
      console.log("Updated Lastname:", updated)
      setFormData(updated)
    }}
    placeholder="Last Name"
  />
</div>


        ) : (
          `${info.row.original.name.firstname} ${info.row.original.name.lastname}`
        ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: info =>
        editingId === info.row.original.id ? (
          <Input
            value={formData.email || ""}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        ) : (
          info.getValue() as string
        ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: info =>
        editingId === info.row.original.id ? (
          <select
            value={formData.role || "user"}
            onChange={e =>
              setFormData({ ...formData, role: e.target.value as "user" | "admin" })
              
            }
           
            className="border rounded p-1"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        ) : (
          info.getValue() as "user" | "admin"
        ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: info =>
        editingId === info.row.original.id ? (
          <div className="flex gap-2">
            <Button size="sm" onClick={handleUpdate}>Save</Button>
            <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => handleEdit(info.row.original)}>Edit</Button>
            <Button size="sm" variant="destructive" onClick={() => handleDelete(info.row.original.id)}>Delete</Button>
          </div>
        ),
    },
  ], [editingId, formData]);

  // Table instance
  const table = useReactTable({
    data: filteredUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users!</p>;

  return (
    <div className="">
      <Input
  placeholder="Filter by name or email..."
  value={filter}
  onChange={e => setFilter(e.target.value)}
  className="mb-4 max-w-sm placeholder-amber-300"
/>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
