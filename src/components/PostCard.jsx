import { useEffect, useState } from "react";
import { Button, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditPost from "./EditPost";
import { useNavigate } from "react-router-dom";

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
   authorId,
   onDelete,
}) {
   const [author, setIsAuthor] = useState("");
   const navigate = useNavigate();

   function handleClick() {
      navigate(`/feed/${id}`);
   }
   // user should be able to navigate to posts with tag of their liking!

   // to do: useState to handling the Likes button
   /* 
   liked = False;
   const [count, setCount] = useState(0);
   function handleClick() {
      setCount(count + 1);
      liked = True;
   }
      */

   // this chekcs if the post author is the current user and then rerends
   // when authorId changes so the delete button doesn't persist
   useEffect(() => {
      postAuthorIsUser();
   }, [authorId]);

   // check if the post author is the current user for editing purposes
   async function postAuthorIsUser() {
      setIsAuthor(authorId === Number(localStorage.getItem("user")));
   }

   const handleDelete = (id) => {
      console.log("Delete post with id:", id);
      onDelete(id);
   };

   return (
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
         <Typography variant="h5">{title}</Typography>

         {author && (
            <Button
               variant="contained"
               onClick={() => handleDelete(id)}
               color="error"
            >
               Delete
            </Button>
         )}
         <Typography
            sx={{ fontWeight: "bold", textDecoration: "underline" }}
            variant="body1"
         >
            @{username}
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
               <Button
                  variant="text"
                  color="black"
                  onClick={() => navigate(`/tags/genre/${tag}`)}
                  key={tag}
               >
                  {tag}
               </Button>
            ))}
            <Button
               variant="text"
               color="black"
               onClick={() => navigate(`/tags/period/${periodTag}`)}
            >
               {periodTag}
            </Button>
         </div>

         <div
            style={{
               display: "flex",
               gap: "8px",
            }}
         >
            <IconButton sx={{ borderRadius: "6px" }} color="error" size="small">
               <FavoriteBorderIcon></FavoriteBorderIcon>
               {likeCount}
            </IconButton>
            <Button variant="contained" color="black" onClick={handleClick}>
               Comments {commentCount}
            </Button>
         </div>
      </div>
   );
}

export default PostCard;
