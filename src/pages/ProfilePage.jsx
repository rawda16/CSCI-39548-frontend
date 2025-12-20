import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostList } from "../components";
import api from "../axiosConfig";
import { Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

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
         <Typography
            component={RouterLink}
            to="/feed"
            variant="h2"
            color="black"
            sx={{ textDecoration: "none", cursor: "pointer" }}
         >
            Fits in Flicks
         </Typography>

         <Typography
            variant="h4"
            sx={{ textAlign: "center", margin: "20px 0" }}
         >
            {username}
         </Typography>

         <PostList posts={posts} />
      </>
   );
}

export default ProfilePage;
