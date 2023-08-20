import * as React from "react";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useIssueReward from "../features/rewards/useIssueReward";

export default function OutlinedCard({ value, title, description }) {
  const { isIssuingReward, issueReward } = useIssueReward();
  return (
    <Box sx={{ minWidth: 200 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            style={{ overflowWrap: "break-word" }}
          >
            {value}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {title}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              issueReward(value);
            }}
          >
            Buy Reward
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
