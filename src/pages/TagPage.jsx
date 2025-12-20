import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostList } from "../components";
import api from "../axiosConfig";
import { Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";

function TagPage({ type }) {
   const { tag } = useParams();
   const [posts, setPosts] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      // get posts of type of tag
      async function fetchTaggedPosts() {
         try {
            const response = await api.get(`/posts?${type}=${tag}`);
            setPosts(Array.isArray(response.data) ? response.data : []);
         } catch (error) {
            console.error("Error fetching tagged posts:", error);
            setPosts([]);
         } finally {
            setLoading(false);
         }
      }

      fetchTaggedPosts();
   }, [tag, type]);

   // loading screen
   if (loading) {
      return <Typography>Loading posts...</Typography>;
   }

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

         <Typography
            variant="h4"
            sx={{ textAlign: "center", margin: "20px 0" }}
         >
            #{tag}
         </Typography>

         <PostList posts={posts} />
      </>
   );
}

export default TagPage;
