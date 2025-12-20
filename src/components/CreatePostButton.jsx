import { Button } from "@mui/material";

function CreatePostButton() {
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
