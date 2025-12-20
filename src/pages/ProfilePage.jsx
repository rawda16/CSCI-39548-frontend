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
   const [displayName, setDisplayName] = useState("");

   useEffect(() => {
      async function fetchUserPosts() {
         try {
            // fetch posts
            const res = await api.get(`/posts?authorId=${userId}`);
            setPosts(Array.isArray(res.data) ? res.data : []);

            // fetch user info
            const userRes = await api.get(`/user/${userId}`);
            setDisplayName(userRes.data.displayName);
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

   // handle deleting the post
   async function handleDelete(id) {
      try {
         await api.delete(`/post/${id}`);
         alert("Post deleted successfully!");
         setPosts(posts.filter((post) => post.id !== id));
      } catch (error) {
         alert(error.response.data.message || "Error deleting post");
         console.error("Error deleting post:", error);
      }
   }

   return (
      <>
         <Stack
            direction='row'
            spacing={2}
            alignItems='center'
            color='black'
            sx={{
               mt: 3,
               mb: 2,
               ml: 4,
               cursor: "pointer",
               textDecoration: "none",
            }}
            component={RouterLink}
            to='/feed'
            variant='h2'
         >
            <MovieFilterIcon sx={{ fontSize: 100 }} />
            <Typography
               variant='h2'
               sx={{ display: "flex", justifyContent: "flex-start" }}
            >
               Fits in Flicks
            </Typography>
         </Stack>

         <Typography
            variant='h4'
            sx={{ textAlign: "center", margin: "20px 0" }}
         >
            {displayName}
         </Typography>
         {}
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
            <PostList posts={posts} onDelete={handleDelete} />
         )}
      </>
   );
}

export default ProfilePage;
