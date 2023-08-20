import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import useAddProduct from "./useAddProduct";

function AddProductForm({ brandId }) {
  const { isAddingProuct, addProduct } = useAddProduct();
  const { register, handleSubmit, reset, formState } = useForm();
  const errors = formState.errors;
  function onSubmit(data) {
    data.brandId = brandId;
    addProduct(data, {
      onSuccess: () => {
        reset();
      },
    });
  }
  function onError(err) {
    console.log(err);
  }
  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "30ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div>
          <TextField
            fullWidth
            id="name"
            label="Name"
            variant="outlined"
            type="text"
            {...register("name", {
              required: "This field is required!",
            })}
          />
          {errors?.name?.message && <h4>{errors.name.message}</h4>}
        </div>
        <div>
          <TextField
            fullWidth
            id="category"
            label="Category"
            variant="outlined"
            type="text"
            {...register("category")}
          />
          {errors?.category?.message && <h4>{errors.category.message}</h4>}
        </div>
        <div>
          <TextField
            fullWidth
            id="imageUrl"
            label="Image Url"
            variant="outlined"
            type="text"
            {...register("imageUrl")}
          />
          {errors?.imageUrl?.message && <h4>{errors.imageUrl.message}</h4>}
        </div>
        <div>
          <TextField
            fullWidth
            id="price"
            label="Price"
            variant="outlined"
            type="number"
            {...register("price")}
          />
          {errors?.price?.message && <h4>{errors.price.message}</h4>}
        </div>
        <Button type="submit" variant="contained">
          Add Product
        </Button>
      </Box>
    </>
  );
}

export default AddProductForm;
