import { Box, Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import MilestoneInput from "../../ui/MilestoneInput";
import useRegisterBrand from "./useRegisterBrand";

function BrandRegistrationForm() {
  const { isRegistering, registerBrand } = useRegisterBrand();
  const { register, handleSubmit, getValues, reset, formState } = useForm();
  const [index, setIndex] = useState(0);
  const errors = formState.errors;
  const milestones = useRef([]);

  function onSubmit(data) {
    let milestones = [];

    for (let i = 0; i < index + 1; i++) {
      milestones.push([
        Number(data[`start${index}`]),
        Number(data[`end${index}`]),
        Number(data[`multiplier${index}`]),
      ]);
    }
    milestones.push([Number(data.startLast), 0, Number(data.multiplierLast)]);
    const newData = {
      name: data.name,
      category: data.category,
      rewardPricePercentage: data.percentage,
      rewardMilestones: milestones,
    };

    registerBrand(newData, {
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
      <h1>Register your Brand</h1>
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
            id="category"
            type="text"
            label="Category"
            {...register("category", {
              required: "This field is required!",
            })}
          />
          {errors?.category?.message && <h4>{errors.category.message}</h4>}
        </div>
        <div>
          <TextField
            type="number"
            id="percentage"
            label="Token Reward Price Percentage"
            {...register("percentage", {
              required: "This field is required!",
              min: {
                value: 5,
                message: `Minimum token Reward price should be atleast 5% of the purchase amount!`,
              },
            })}
          />
          {errors?.percentage?.message && <h4>{errors.percentage.message}</h4>}
        </div>
        <h3>Set Milestones</h3>
        <div>
          <TextField
            type="number"
            id="start0"
            label="Start"
            {...register("start0", {
              required: "This field is required!",
              min: {
                value: 0,
                message: `Minimum start value should be 0!`,
              },
            })}
          />
          {errors?.start0?.message && <h4>{errors.start0.message}</h4>}
          <TextField
            type="number"
            id="end0"
            label="End"
            {...register("end0", {
              required: "This field is required!",
              validate: (value) => {
                return (
                  value > Number(getValues().start0) ||
                  "The end value should be greater than start value!"
                );
              },
            })}
          />
          {errors?.end0?.message && <h4>{errors.end0.message}</h4>}
          <TextField
            type="number"
            id="multiplier0"
            label="Multiplier"
            {...register("multiplier0", {
              required: "This field is required!",
              min: {
                value: 1,
                message: "Multiplier value should be atleast 1!",
              },
            })}
          />
          {errors?.multiplier0?.message && (
            <h4>{errors.multiplier0.message}</h4>
          )}
        </div>
        {milestones.current.map((idx) => (
          <MilestoneInput
            key={idx}
            index={idx}
            register={register}
            getValues={getValues}
            errors={errors}
          />
        ))}
        <Button
          onClick={() => {
            setIndex(index + 1);
            milestones.current.push(index + 1);
          }}
        >
          Add milestone
        </Button>
        <div>
          <TextField
            type="number"
            id="startLast"
            label="Start"
            {...register("startLast", {
              required: "This field is required!",
              validate: (value) => {
                return (
                  value > getValues()[`end${index}`] ||
                  "The value should be greater than the end value of previously defined milestone!"
                );
              },
            })}
          />
          {errors?.startLast?.message && <h4>{errors.startLast.message}</h4>}
          <TextField
            type="text"
            id="endLast"
            label="End"
            defaultValue="inf"
            disabled
            {...register("endLast")}
          />
          {errors?.endLast?.message && <h4>{errors.endLast.message}</h4>}
          <TextField
            type="number"
            id="multiplierLast"
            label="Multiplier"
            {...register("multiplierLast", {
              required: "This field is required!",
              validate: (value) => {
                return (
                  value > getValues()[`multiplier${index}`] ||
                  "The value should be greater than the multiplier value of previously defined milestones!"
                );
              },
            })}
          />
          {errors?.multiplierLast?.message && (
            <h4>{errors.multiplierLast.message}</h4>
          )}
        </div>
        <Button type="submit" variant="contained">
          Register
        </Button>
      </Box>
    </>
  );
}

export default BrandRegistrationForm;
