import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function LogoutButton() {
   const navigate = useNavigate();

   const handleLogout = () => {
      // clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // redirect to homepage
      navigate("/");
   };

   return (
      <Button onClick={handleLogout} variant='outlined' color='error'>
         Logout
      </Button>
   );
}

export default LogoutButton;
