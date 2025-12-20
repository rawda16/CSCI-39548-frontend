import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CreatePostButton() {
   const navigate = useNavigate();
   return (
      <Button
         variant="contained"
         color="black"
         onClick={() => navigate(`/create`)}
      >
         Create a New Post
      </Button>
   );
}

export default CreatePostButton;
