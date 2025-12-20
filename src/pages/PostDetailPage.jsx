import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import api from "../axiosConfig";
import { Box, Button, Stack, Typography } from "@mui/material";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { EditPost } from "../components";
import axios from "axios";
import CommentSection from "../components/CommentSection";

function PostDetailPage() {
   const { id } = useParams();
   const [post, setPost] = useState(null);
   const [editing, setEditing] = useState(false);
   const [isAuthor, setIsAuthor] = useState(false);

   const navigate = useNavigate();

   // fetch post data on component mount
   useEffect(() => {
      getPost();
   }, []);

   // check if post author is current user after post is fetched
   useEffect(() => {
      postAuthorIsUser();
   }, [post]);

   // get the post
   async function getPost() {
      try {
         const response = await api.get(`posts/${id}`);
         setPost(response.data);
      } catch (error) {
         console.error(error);
         setPost(null);
      }
   }

   // if there is no post, return post not found
   if (!post) {
      return <div>Post not found</div>;
   }

   // check if the post author is the current user for editing purposes
   async function postAuthorIsUser() {
      // if there is no post, just return
      if (!post) {
         return;
      }

      setIsAuthor(post.authorId === Number(localStorage.getItem("user")));
   }

   // handle deleting the post
   async function handleDelete(id) {
      try {
         await api.delete(`/post/${id}`);
         alert("Post deleted successfully!");
         navigate("/feed");
      } catch (error) {
         console.error("Error deleting post:", error);
         alert(error.response.data.message || "Error deleting post");
      }
   }

   // handle editing the post (same as postform)
   const handleEdit = async (
      id,
      title,
      content,
      timePeriod,
      genre,
      movie,
      image
   ) => {
      const usingOldImage = !image; // if no new image is uploaded, use old image
      // checking if fields are valid and filled
      if (!title.trim()) return;
      if (!content.trim()) return;
      if (!timePeriod.trim()) return;
      if (!movie.trim()) return;
      if (genre.length === 0) {
         return;
      } else {
         for (let g of genre) {
            if (!g.trim()) {
               return;
            }
         }
      }

      try {
         let image_url = "";
         if (!usingOldImage) {
            image_url = await uploadImage(image[0]);
         } else {
            image_url = post.image_url;
         } // uploading image to get url
         const data = {
            title,
            content,
            timePeriod,
            genre,
            movie,
            image_url,
         };

         // sending post request to upload data
         const response = await api.put(`/posts/${id}`, data);

         alert("Post editted successfully!");

         setPost(response.data);
         setEditing(false);
      } catch (error) {
         if (error.message === "Image size exceeds 5MB limit") {
            alert(error.message);
         } else {
            alert("Error editting post.");
         }
         console.error("Error editting post:", error);
      }
   };

   // uploading images to cloudinary
   const uploadImage = async (image) => {
      const CLOUD_NAME = "dqmfnu7i7"; // name of cloudinary API
      const formData = new FormData();

      formData.append("file", image);

      // set upload presets
      formData.append("upload_preset", "fits-in-flicks");

      // checking image size to be less than 5MB
      if (image.size > 5242880) {
         throw new Error("Image size exceeds 5MB limit");
      }

      try {
         // upload to cloudinary
         const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            formData
         );

         return response.data.secure_url;
      } catch (error) {
         console.error("Error uploading image to Cloudinary:", error);
         throw new Error("Failed to upload image", response.statusText);
      }
   };

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

         {editing ? (
            <EditPost post={post} id={id} onEdit={handleEdit} />
         ) : (
            <div
               style={{
                  width: "1000px",
                  margin: "20px auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "40px",
                  borderBottom: "1px solid lightgray",
                  gap: "5px",
               }}
            >
               <Stack
                  direction='row'
                  justifyContent='space-between'
                  width='100%'
               >
                  <Typography variant='h5'>{post.title}</Typography>
                  {isAuthor && (
                     <Button
                        variant='contained'
                        color='error'
                        onClick={() => handleDelete(post.id)}
                     >
                        Delete
                     </Button>
                  )}
               </Stack>

               <Typography
                  sx={{
                     fontWeight: "bold",
                     textDecoration: "underline",
                     cursor: "pointer",
                  }}
                  onClick={() => navigate(`/profile/${post.authorId}`)}
               >
                  @{post.author.username}
               </Typography>
               <div
                  style={{
                     width: "100%",
                     display: "flex",
                     justifyContent: "center",
                  }}
               >
                  <img
                     src={post.image_url}
                     style={{
                        width: "600px",
                        maxWidth: "100%",
                        height: "auto",
                     }}
                  />
               </div>
               <div
                  style={{
                     width: "900px",
                     backgroundColor: "white",
                     padding: "50px",
                     borderRadius: "16px",
                     border: "1px solid black",
                  }}
               >
                  <Typography
                     style={{
                        display: "flex",

                        textAlign: "left",
                        color: "black",
                        margin: 0,
                     }}
                  >
                     {post.content}
                  </Typography>
               </div>
               <div
                  style={{
                     display: "flex",
                     gap: "8px",
                  }}
               >
                  {post.genre.map((tag) => (
                     <Button
                        variant='text'
                        color='black'
                        onClick={(e) => {
                           e.stopPropagation;
                           navigate(`/tags/genre/${tag}`);
                        }}
                        key={tag}
                     >
                        {tag}
                     </Button>
                  ))}
                  <Button
                     variant='text'
                     color='black'
                     onClick={() => navigate(`/tags/period/${post.timePeriod}`)}
                  >
                     {post.timePeriod}
                  </Button>
               </div>

               <div
                  style={{
                     display: "flex",
                     gap: "8px",
                  }}
               >
                  {isAuthor && (
                     <Button
                        variant='outlined'
                        onClick={() => setEditing(true)}
                     >
                        Edit Post
                     </Button>
                  )}
               </div>
               <CommentSection postId={id} />
            </div>
         )}
      </>
   );
}

export default PostDetailPage;
