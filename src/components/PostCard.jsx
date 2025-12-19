import { useState } from "react";
import { Button, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditPost from "./EditPost";

function PostCard({
   username,
   title,
   image,
   description,
   periodTag,
   genreTags = [],
   likeCount = 0,
   commentCount = 0,
   id,
}) {
   const [editing, setEditing] = useState(false);

   const handleEdit = async (
      id,
      title,
      content,
      timePeriod,
      genre,
      movie,
      image_url
   ) => {
      // checking if fields are valid and filled
      if (!title.trim()) return;
      if (!content.trim()) return;
      if (!timePeriod.trim()) return;
      if (!movie.trim()) return;
      if (!image) {
         alert("Please upload an image.");
         return;
      }
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
         const image_url = await uploadImage(image[0]); // uploading image to get url
         const data = {
            title,
            content,
            timePeriod,
            genre,
            movie,
            image_url,
         };

         // sending post request to upload data
         const response = await api.post(`/posts/${id}`, data);

         console.log("Post editted successfully:", response.data);
         alert("Post editted successfully!");

         // // reseting form
         // setTitle("");
         // setContent("");
         // setTimePeriod("");
         // setGenre([]);
         // setMovie("");
         // setImage(null);

         // navigate back to home page
         navigate("/feed");
      } catch (error) {
         if (error.message === "Image size exceeds 5MB limit") {
            alert(error.message);
         } else {
            alert("Error submitting post.");
         }
         console.error("Error submitting post:", error);
      }

      setEditing(false);
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
   // to do: useState to handling the Likes button
   /* 
   liked = False;
   const [count, setCount] = useState(0);
   function handleClick() {
      setCount(count + 1);
      liked = True;
   }
      */
   return (
      <>
         {editing ? (
            <EditPost
               id={id}
               title={title}
               content={description}
               image={image}
               timePeriod={periodTag}
               genre={genreTags}
               onEdit={handleEdit}
            />
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
               <Typography variant='h5'>{title}</Typography>
               <Typography
                  sx={{ fontWeight: "bold", textDecoration: "underline" }}
                  variant='body1'
               >
                  {username}
               </Typography>
               <div
                  style={{
                     width: "100%",
                     display: "flex",
                     justifyContent: "center",
                  }}
               >
                  <img
                     src={image}
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
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "left",
                        color: "black",
                        margin: 0,
                     }}
                  >
                     {description}
                  </Typography>
               </div>
               <div
                  style={{
                     display: "flex",
                     gap: "8px",
                  }}
               >
                  {genreTags.map((tag) => (
                     <Button variant='text' color='black' key={tag}>
                        {tag}
                     </Button>
                  ))}
                  <Button variant='text' color='black'>
                     {periodTag}
                  </Button>
               </div>

               <div
                  style={{
                     display: "flex",
                     gap: "8px",
                  }}
               >
                  <IconButton
                     sx={{ borderRadius: "6px" }}
                     color='error'
                     size='small'
                  >
                     <FavoriteBorderIcon></FavoriteBorderIcon>
                     {likeCount}
                  </IconButton>
                  <Button variant='contained' color='black'>
                     Comments {commentCount}
                  </Button>
                  <Button variant='outlined' onClick={() => setEditing(true)}>
                     Edit Post
                  </Button>
               </div>
            </div>
         )}
      </>
   );
}

export default PostCard;
