import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import useAddReward from "./useAddReward";

function AddRewardForm({ brandId }) {
  const { isAddingReward, addReward } = useAddReward();
  const { register, handleSubmit, reset, formState } = useForm();
  const errors = formState.errors;
  function onSubmit(data) {
    data.brandId = brandId;
    addReward(data, {
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
            id="discount"
            label="Discount"
            variant="outlined"
            type="Number"
            {...register("discount", {
              required: "This field is required!",
            })}
          />
          {errors?.discount?.message && <h4>{errors.discount.message}</h4>}
        </div>
        <div>
          <TextField
            fullWidth
            id="maxDiscountValue"
            label="Maximum discount value"
            variant="outlined"
            type="number"
            {...register("maxDiscountValue")}
          />
          {errors?.maxDiscountValue?.message && (
            <h4>{errors.maxDiscountValue.message}</h4>
          )}
        </div>
        <div>
          <TextField
            fullWidth
            id="tokens"
            label="Token quantity"
            variant="outlined"
            type="number"
            {...register("tokens")}
          />
          {errors?.tokens?.message && <h4>{errors.tokens.message}</h4>}
        </div>
        <Button type="submit" variant="contained">
          Add Reward
        </Button>
      </Box>
    </>
  );
}

export default AddRewardForm;
