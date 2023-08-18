import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import useRegisterUser from "./useRegisterUser";

function UserRegistrationForm() {
  const { isRegistering, registerUser } = useRegisterUser();
  const { register, handleSubmit, reset, formState } = useForm();
  const errors = formState.errors;
  function onSubmit(data) {
    if (data.referralCode == undefined) {
      data.referralCode = "";
    }
    registerUser(data, {
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
      <h1>User Registration</h1>
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
            id="referralcode"
            label="Referral Code"
            variant="outlined"
            type="text"
            {...register("referralcode")}
          />
          {errors?.name?.message && <h4>{errors.name.message}</h4>}
        </div>
        <Button type="submit" variant="contained">
          Register
        </Button>
      </Box>
    </div>
  );
}

export default UserRegistrationForm;
