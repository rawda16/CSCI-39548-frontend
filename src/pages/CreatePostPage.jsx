import { Stack, Typography } from "@mui/material";
import { PostForm } from "../components";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { Link as RouterLink } from "react-router-dom";

function CreatePostPage() {
   return (
      <>
         <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            color="black"
            sx={{
               mt: 3,
               mb: 2,
               ml: 4,
               cursor: "pointer",
               textDecoration: "none",
            }}
            component={RouterLink}
            to="/feed"
            variant="h2"
         >
            <MovieFilterIcon sx={{ fontSize: 100 }} />
            <Typography
               variant="h2"
               sx={{ display: "flex", justifyContent: "flex-start" }}
            >
               Fits in Flicks
            </Typography>
         </Stack>

         <PostForm />
      </>
   );
}

export default CreatePostPage;
