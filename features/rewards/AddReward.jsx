import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import AddRewardForm from "./AddRewardForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function AddReward({ brandId }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>Add Reward</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-form"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Add New Reward
          </Typography>
          <div id="modal-modal-form" component="form">
            <AddRewardForm brandId={brandId} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default AddReward;
