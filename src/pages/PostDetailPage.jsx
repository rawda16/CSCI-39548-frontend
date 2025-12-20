import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import api from "../axiosConfig";
import { Button, IconButton, Typography } from "@mui/material";
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
      console.log(localStorage);

      setIsAuthor(post.authorId === Number(localStorage.getItem("user")));
   }

   // handle deleting the post
   async function handleDelete(id) {
      console.log("Deleting post with id:", id);
      try {
         await api.delete(`/post/${id}`);
         alert("Post deleted successfully!");
         navigate("/feed");
      } catch (error) {
         console.error("Error deleting post:", error);
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

         console.log("Post editted successfully:", response.data);
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

   const uploadImage = async (image) => {
      // in future, add signed uploads
      const CLOUD_NAME = "dqmfnu7i7"; // name of cloudinary API
      const formData = new FormData();

      formData.append("file", image);

      // upload preset lets you choose settings when uploading,
      // such as allowing unsigned uploads and uploading to a specific folder
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
         console.log("Cloudinary response:", response);

         return response.data.secure_url;
      } catch (error) {
         console.error("Error uploading image to Cloudinary:", error);
         throw new Error("Failed to upload image", response.statusText);
      }
   };

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
               <Typography variant='h5'>{post.title}</Typography>
               <Typography
                  sx={{ fontWeight: "bold", textDecoration: "underline" }}
                  variant='body1'
               >
                  {post.author.username}
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
                     <Button variant='text' color='black' key={tag}>
                        {tag}
                     </Button>
                  ))}
                  <Button variant='text' color='black'>
                     {post.timePeriod}
                  </Button>
               </div>

               <div
                  style={{
                     display: "flex",
                     gap: "8px",
                  }}
               >
                  {/* <IconButton sx={{ borderRadius: "6px" }} color='error' size='small'>
               <FavoriteBorderIcon></FavoriteBorderIcon>
               {likeCount}
            </IconButton>
            <Button variant='contained' color='black'>
               Comments {commentCount}
            </Button> */}
                  {isAuthor && (
                     <Button
                        variant='outlined'
                        onClick={() => setEditing(true)}
                     >
                        Edit Post
                     </Button>
                  )}
                  {isAuthor && (
                     <Button
                        variant='outlined'
                        color='error'
                        onClick={() => handleDelete(post.id)}
                     >
                        Delete Post
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
