import { Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      <Box
        sx={{
          width: 1000,
          height: 200,
          margin: "0 auto",
          marginTop: "50px",
        }}
      >
        <Item>
          <h1 className="display-4">Loyalty Points</h1>
            <h4></h4>
            <p>
              This web application demonstrates <b>Blockchain</b> based <b>Loyalty 
              and Rewards Program</b> using <b>Fungible Tokens</b>
            </p>
            <p>
              <Button
                  onClick={() => navigate("About")}
                  variant="contained"
                >
                  learn more
              </Button>
            </p>
        </Item>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Item>
              <h2>Members</h2>
              <p>
                Customers can register as Member to this program. Once
                registered they can make transactions to earn points and use
                points, and view all transactions.
              </p>
              <p>
                <Button
                  onClick={() => navigate("register-user")}
                  variant="contained"
                >
                  Register as User
                </Button>
              </p>
            </Item>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item>
              <h2>Partners</h2>
              <p>
                Companies can register as Partner on the network. They can view
                all transactions and dashboard to view total points allocated
                and redeemed by members.
              </p>
              <p>
                <Button
                  onClick={() => navigate("register-brand")}
                  variant="contained"
                >
                  Register your Brand
                </Button>
              </p>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Landing;
