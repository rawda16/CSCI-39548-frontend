import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostList } from "../components";
import api from "../axiosConfig";
import { Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

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
         <Typography
            component={RouterLink}
            to="/feed"
            variant="h2"
            color="black"
            sx={{ cursor: "pointer", textDecoration: "none" }}
         >
            Fits in Flicks
         </Typography>

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
