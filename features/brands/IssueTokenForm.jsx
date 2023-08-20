import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import useIssueTokens from "./useIssueTokens";

function IssueTokenForm({ brandId }) {
  const { isIssuingTokens, issueTokens } = useIssueTokens();
  const { register, handleSubmit, reset, formState } = useForm();
  const errors = formState.errors;
  function onSubmit(data) {
    data.brandId = brandId;
    issueTokens(data, {
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
      <h1>Issue Tokens</h1>
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
            id="tokens"
            label="Token Quantity"
            variant="outlined"
            type="Number"
            {...register("tokens", {
              required: "This field is required!",
            })}
          />
          {errors?.tokens?.message && <h4>{errors.tokens.message}</h4>}
        </div>
        <Button type="submit" variant="contained">
          Issue
        </Button>
      </Box>
    </div>
  );
}

export default IssueTokenForm;
