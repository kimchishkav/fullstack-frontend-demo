import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import AddCar from "./AddCar";
import EditCar from "./EditCar";
import { getCars, deleteCar } from "../api/carapi";

function Carlist({ logOut }) {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const queryClient = useQueryClient();

  const [snack, setSnack] = useState({
    open: false,
    message: "",
  });

  const handleEdit = (row) => {
    setSelectedCar(row);
    setEditOpen(true);
  };

  const {
    data: cars = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  const deleteMutation = useMutation({
    mutationFn: (selfHref) => deleteCar(selfHref),
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
      setSnack({ open: true, message: "Car deleted" });
    },
    onError: () => {
      setSnack({ open: true, message: "Delete failed" });
    },
  });

  const handleDelete = (row) => {
    if (!row.selfHref) {
      alert("No self link for this car");
      return;
    }
    if (window.confirm("Delete this car?")) {
      deleteMutation.mutate(row.selfHref);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    if (logOut) logOut();
  };

  const columns = [
    { field: "brand", headerName: "Brand", flex: 1 },
    { field: "model", headerName: "Model", flex: 1 },
    { field: "color", headerName: "Color", flex: 1 },
    { field: "year", headerName: "Year", type: "number", width: 100 },
    { field: "price", headerName: "Price", type: "number", width: 120 },
    { field: "owner", headerName: "Owner", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => handleDelete(params.row)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  if (isLoading) return <div>Loading cars...</div>;
  if (isError) return <div>Error loading cars</div>;

  return (
    <>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <AddCar />
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>

      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={cars}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          slots={{ toolbar: GridToolbar }}
        />
      </Paper>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        message={snack.message}
        onClose={() => setSnack({ ...snack, open: false })}
      />

      <EditCar
        car={selectedCar}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </>
  );
}

export default Carlist;
