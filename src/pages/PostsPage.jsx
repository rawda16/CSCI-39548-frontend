import { useEffect, useState } from "react";
import { PostList } from "../components";
import api from "..//axiosConfig";

function PostsPage() {
   // TO DO: posts need to be in order from newest to oldest
   // rn it's oldest to newest

   const [posts, setPosts] = useState([]);

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

   return <PostList posts={posts} onDelete={handleDelete} />;
}

export default PostsPage;
