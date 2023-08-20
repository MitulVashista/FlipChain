import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function OutlinedCard({ value, title, description }) {
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
      </Card>
    </Box>
  );
}
