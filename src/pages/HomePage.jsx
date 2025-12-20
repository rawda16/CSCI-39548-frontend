import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomePage() {
   const navigate = useNavigate();

   function handleClick() {
      navigate(`/register`);
   }
   function handleClick2() {
      navigate(`/login`);
   }

   return (
      <Box>
         <Typography
            variant="h2"
            sx={{ display: "flex", justifyContent: "flex-start" }}
         >
            Fits in Flicks
         </Typography>
         <Box
            sx={{
               display: "flex",
               flexDirection: "column",
               justifyContent: "center",
               gap: 3,
               mt: 6,
            }}
         >
            <Typography variant="h5">
               Talk about and bring your favorite character's outfit to life!
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
               <Button variant="contained" onClick={handleClick}>
                  Create An Account
               </Button>
               <Button variant="contained" onClick={handleClick2}>
                  Login
               </Button>
            </Box>
         </Box>
      </Box>
   );
}

export default HomePage;
