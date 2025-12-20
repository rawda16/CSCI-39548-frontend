import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MyProfile() {
   const navigate = useNavigate();

   function goToMyProfile() {
      const userId = localStorage.getItem("user");
      navigate(`/profile/${userId}`);
   }

   return (
      <Button variant="contained" color="black" onClick={goToMyProfile}>
         My Profile
      </Button>
   );
}

export default MyProfile;
