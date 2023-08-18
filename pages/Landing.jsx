import { Button } from "@mui/material";
import BrandRegistrationForm from "../features/brands/BrandRegistrationForm";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Landing Page</h1>
      <Button onClick={() => navigate("register-brand")} variant="contained">
        Register your Brand
      </Button>
      <Button onClick={() => navigate("register-user")} variant="contained">
        Register as User
      </Button>
    </div>
  );
}

export default Landing;
