import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";

function CommentSection({ postId }) {
   const navigate = useNavigate();
   const [comments, setComments] = useState([]);
   const [newComment, setNewComment] = useState("");

   // get user
   const currentUserId = Number(localStorage.getItem("user"));

   // fetch comments
   const fetchComments = async () => {
      try {
         const res = await api.get(`/post/${postId}/comment`);
         setComments(res.data);
      } catch (err) {
         console.error("Error fetching comments", err);
      }
   };

   useEffect(() => {
      fetchComments();
   }, [postId]);

   // add comment
   const handleAddComment = async () => {
      if (!newComment.trim()) return;

      try {
         await api.post(`/post/${postId}/comment`, {
            content: newComment,
         });
         setNewComment("");
         fetchComments();
      } catch (err) {
         console.error("Error adding comment", err);
      }
   };

   // delete comment
   const handleDeleteComment = async (commentId) => {
      try {
         await api.delete(`/post/${postId}/comment/${commentId}`);
         fetchComments();
      } catch (err) {
         console.error("Error deleting comment", err);
      }
   };

   // view comments
   return (
      <div
         style={{
            marginTop: "40px",
            width: "1000px",
            marginLeft: "auto",
            marginRight: "auto",
         }}
      >
         {comments.map((comment) => (
            <div
               key={comment.id}
               style={{
                  width: "1000px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "16px",
               }}
            >
               <Box sx={{ width: "900px" }}>
                  <Typography
                     sx={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                        cursor: "pointer",
                     }}
                     onClick={() => navigate(`/profile/${comment.authorId}`)}
                  >
                     @{comment.author.username}
                  </Typography>
                  <Typography
                     sx={{
                        width: "900px",
                        padding: "20px",
                        borderRadius: "12px",
                        border: "1px solid #ddd",
                        backgroundColor: "white",
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                     }}
                  >
                     {comment.content}
                  </Typography>
               </Box>

               {comment.authorId === currentUserId && (
                  <Button
                     color="error"
                     size="small"
                     onClick={() => handleDeleteComment(comment.id)}
                  >
                     Delete
                  </Button>
               )}
            </div>
         ))}

         <div style={{ marginTop: "20px" }}>
            <TextField
               fullWidth
               multiline
               rows={2}
               placeholder="Add a comment..."
               value={newComment}
               onChange={(e) => setNewComment(e.target.value)}
               sx={{ display: "flex", alignContent: "center" }}
            />

            <Button
               variant="contained"
               sx={{ marginTop: "10px" }}
               onClick={handleAddComment}
            >
               Add Comment
            </Button>
         </div>
      </div>
   );
}

export default CommentSection;
