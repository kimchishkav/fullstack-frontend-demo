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
import { addCar } from "../api/carapi";

function AddCar() {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);

  const [car, setCar] = React.useState({
    brand: "",
    model: "",
    color: "",
    year: "",
    price: "",
    owner: "",
  });

  const mutation = useMutation({
    mutationFn: (newCar) => addCar(newCar),
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
      setOpen(false);
      setCar({
        brand: "",
        model: "",
        color: "",
        year: "",
        price: "",
        owner: "",
      });
    },
  });

  const handleChange = (event) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    mutation.mutate({
      ...car,
      year: Number(car.year),
      price: Number(car.price),
    });
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        New Car
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Car</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Brand"
              name="brand"
              value={car.brand}
              onChange={handleChange}
            />
            <TextField
              label="Model"
              name="model"
              value={car.model}
              onChange={handleChange}
            />
            <TextField
              label="Color"
              name="color"
              value={car.color}
              onChange={handleChange}
            />
            <TextField
              label="Year"
              name="year"
              type="number"
              value={car.year}
              onChange={handleChange}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={car.price}
              onChange={handleChange}
            />
            <TextField
              label="Owner"
              name="owner"
              value={car.owner}
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddCar;
