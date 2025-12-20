import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LogOut, PostList } from "../components";
import api from "../axiosConfig";
import { Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";

function ProfilePage() {
   const { userId } = useParams();
   const [posts, setPosts] = useState([]);
   const [username, setUsername] = useState("");
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function fetchUserPosts() {
         try {
            const res = await api.get(`/posts?authorId=${userId}`);
            setPosts(Array.isArray(res.data) ? res.data : []);

            // pull username
            if (res.data.length > 0) {
               setUsername(res.data[0].author.username);
            }
         } catch (err) {
            console.error(err);
            setPosts([]);
         } finally {
            setLoading(false);
         }
      }

      fetchUserPosts();
   }, [userId]);

   if (loading) {
      return <Typography>Loading profile...</Typography>;
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
            {username}
         </Typography>
         {posts.length === 0 ? (
            <Typography
               sx={{
                  textAlign: "center",
                  marginTop: "40px",
                  color: "gray",
               }}
            >
               This user hasn’t posted anything yet.
            </Typography>
         ) : (
            <PostList posts={posts} />
         )}

         <PostList posts={posts} />
      </>
   );
}

export default ProfilePage;
