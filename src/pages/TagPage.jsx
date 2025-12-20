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

   if (loading) {
      return <Typography>Loading posts...</Typography>;
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
         <Typography
            component={RouterLink}
            to='/feed'
            variant='h2'
            color='black'
            sx={{ cursor: "pointer", textDecoration: "none" }}
         >
            Fits in Flicks
         </Typography>

         <Typography
            variant='h4'
            sx={{ textAlign: "center", margin: "20px 0" }}
         >
            #{tag}
         </Typography>

         <PostList posts={posts} onDelete={handleDelete} />
      </>
   );
}

export default TagPage;
