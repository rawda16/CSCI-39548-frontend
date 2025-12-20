import { useEffect, useState } from "react";
import { LogOut, PostList } from "../components";
import api from "..//axiosConfig";

function PostsPage() {
   // TO DO: posts need to be in order from newest to oldest
   // rn it's oldest to newest

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

   async function handleDelete(id) {
      try {
         await api.delete(`/post/${id}`);
         alert("Post deleted successfully!");
         setPosts(posts.filter((post) => post.id !== id));
      } catch (error) {
         console.error("Error deleting post:", error);
      }
   }

   return (
      <>
         {loggedIn && <LogOut />}
         <PostList posts={posts} onDelete={handleDelete} />
      </>
   );
}

export default PostsPage;
