import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import bgImage from "../assets/fashion_movies.jpg";

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
         <Stack
            direction='row'
            spacing={2}
            alignItems='center'
            sx={{ mt: 3, mb: 2, ml: 4 }}
         >
            <MovieFilterIcon sx={{ fontSize: 100 }} />
            <Typography
               variant='h2'
               sx={{ display: "flex", justifyContent: "flex-start" }}
            >
               Fits in Flicks
            </Typography>
         </Stack>

         <Box
            sx={{
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               gap: 8,
               padding: 4,
               pt: 0,
            }}
         >
            <Box
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  maxWidth: "500px",
               }}
            >
               <Typography variant='h3'>
                  Talk about and bring your favorite character's outfit to life!
               </Typography>

               <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                     variant='contained'
                     size='large'
                     onClick={handleClick}
                  >
                     Create An Account
                  </Button>
                  <Button
                     variant='outlined'
                     size='large'
                     onClick={handleClick2}
                  >
                     Login
                  </Button>
               </Box>
            </Box>

            <Box
               sx={{
                  backgroundImage: `url(${bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "400px",
                  margin: 5,
                  width: "50%",
                  borderRadius: 4,
               }}
            />
         </Box>
      </Box>
   );
}

export default HomePage;
