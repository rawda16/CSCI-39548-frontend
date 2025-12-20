import { useEffect, useState } from "react";
import { LogOut, PostList } from "../components";
import api from "..//axiosConfig";
import { Box } from "@mui/material";
import MyProfile from "../components/MyProfile";
import CreatePostButton from "../components/CreatePostButton";

function PostsPage() {
   const [posts, setPosts] = useState([]);
   const [loggedIn, setLoggedIn] = useState(false);

   useEffect(() => {
      userIsLoggedIn();
   }, []);

   // check if the user is logged in to not show login
   async function userIsLoggedIn() {
      setLoggedIn(localStorage.getItem("user"));
   }

   const fetchPosts = async () => {
      try {
         const response = await api.get("/posts");
         setPosts(response.data);
      } catch (error) {
         console.error("Error fetching posts:", error);
      }
   };

   useEffect(() => {
      fetchPosts();
   });

   // handle delete post
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
      <Box sx={{ p: 1 }}>
         <Box sx={{ display: "flex" }}>
            {loggedIn && <CreatePostButton />}
            {loggedIn && <MyProfile />}
            {loggedIn && <LogOut />}
         </Box>

         <PostList posts={posts} onDelete={handleDelete} />
      </Box>
   );
}

export default PostsPage;
