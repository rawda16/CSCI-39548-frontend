import { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import api from "../axiosConfig";

function CommentSection({ postId, currentUserId }) {
   const [comments, setComments] = useState([]);
   const [newComment, setNewComment] = useState("");

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

   return (
      <div style={{ marginTop: "40px", width: "900px" }}>
         {comments.map((comment) => (
            <div
               key={comment.id}
               style={{
                  borderBottom: "1px solid #ddd",
                  padding: "10px 0",
                  display: "flex",
                  justifyContent: "space-between",
               }}
            >
               <Typography>{comment.content}</Typography>

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
