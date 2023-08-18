import { TextField } from "@mui/material";

function MilestoneInput({ index, register, getValues, errors }) {
  return (
    <div>
      <TextField
        type="number"
        id={`start${index}`}
        label="Start"
        {...register(`start${index}`, {
          required: "This field is required!",
          validate: (value) => {
            return (
              value > getValues()[`end${index - 1}`] ||
              "The value should be greater than the end value of previously defined milestones!"
            );
          },
        })}
      />
      {errors[`start${index}`]?.message && (
        <h4>{errors[`start${index}`].message}</h4>
      )}
      <TextField
        type="number"
        id={`end${index}`}
        label="End"
        {...register(`end${index}`, {
          required: "This field is required!",
          validate: (value) => {
            return (
              value > Number(getValues()[`start${index}`]) ||
              "The end value should be greater than start value!"
            );
          },
        })}
      />
      {errors[`end${index}`]?.message && (
        <h4>{errors[`end${index}`].message}</h4>
      )}
      <TextField
        type="number"
        id={`multiplier${index}`}
        label="Multiplier"
        {...register(`multiplier${index}`, {
          required: "This field is required!",
          validate: (value) => {
            return (
              value > getValues()[`multiplier${index - 1}`] ||
              "The value should be greater than the multiplier value of previously defined milestones!"
            );
          },
        })}
      />
      {errors[`multiplier${index}`]?.message && (
        <h4>{errors[`multiplier${index}`].message}</h4>
      )}
    </div>
  );
}

export default MilestoneInput;
