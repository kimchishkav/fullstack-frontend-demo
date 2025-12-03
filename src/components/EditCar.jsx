import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { updateCar } from "../api/carapi";

function EditCar({ car, open, onClose }) {
  const queryClient = useQueryClient();
  const [editedCar, setEditedCar] = React.useState(car || {});

  React.useEffect(() => {
    setEditedCar(car || {});
  }, [car]);

  const mutation = useMutation({
    mutationFn: ({ selfHref, car }) => updateCar(selfHref, car),
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
      onClose();
    },
  });

  const handleChange = (event) => {
    setEditedCar({ ...editedCar, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    if (!editedCar.selfHref) {
      alert("No self link");
      return;
    }
    mutation.mutate({
      selfHref: editedCar.selfHref,
      car: {
        brand: editedCar.brand,
        model: editedCar.model,
        color: editedCar.color,
        year: Number(editedCar.year),
        price: Number(editedCar.price),
        owner: editedCar.owner,
      },
    });
  };

  if (!editedCar) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Car</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Brand"
            name="brand"
            value={editedCar.brand || ""}
            onChange={handleChange}
          />
          <TextField
            label="Model"
            name="model"
            value={editedCar.model || ""}
            onChange={handleChange}
          />
          <TextField
            label="Color"
            name="color"
            value={editedCar.color || ""}
            onChange={handleChange}
          />
          <TextField
            label="Year"
            name="year"
            type="number"
            value={editedCar.year || ""}
            onChange={handleChange}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={editedCar.price || ""}
            onChange={handleChange}
          />
          <TextField
            label="Owner"
            name="owner"
            value={editedCar.owner || ""}
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditCar;
