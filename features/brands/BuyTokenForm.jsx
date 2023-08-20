import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import useBuyTokens from "./useBuyTokens";

function BuyTokenForm({ brandId }) {
  const { isBuyingTokens, buyTokens } = useBuyTokens();
  const { register, handleSubmit, reset, formState } = useForm();
  const errors = formState.errors;
  function onSubmit(data) {
    data.brandId = brandId;
    buyTokens(data, {
      onSuccess: () => {
        reset();
      },
    });
  }
  function onError(err) {
    console.log(err);
  }
  return (
    <div>
      <h1>Buy Tokens</h1>
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
            id="amount"
            label="Amount in Ether"
            variant="outlined"
            type="Number"
            {...register("amount", {
              required: "This field is required!",
            })}
          />
          {errors?.amount?.message && <h4>{errors.amount.message}</h4>}
        </div>
        <Button type="submit" variant="contained">
          Buy
        </Button>
      </Box>
    </div>
  );
}

export default BuyTokenForm;
