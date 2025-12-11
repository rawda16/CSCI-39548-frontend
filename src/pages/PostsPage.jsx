import { useState } from "react";
import { PostList } from "../components";

function PostsPage() {
   const posts = [
      {
         id: "p1",
         userId: "u1",
         username: "maida",

         title: "Mean Girls Woo",
         description:
            "Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!",
         periodTag: "2000s",
         genreTags: ["Comedy", "Drama"],
         commentCount: 3,
      },
      {
         id: "p2",
         userId: "u2",
         username: "rawda",

         title: "Vamps Are Cool",
         description:
            "Look at these victorian style fits from Dracula! Does anyone know where I could find a similar top? :/",
         periodTag: "2000s",
         genreTags: ["Action", "Horror"],
         commentCount: 5,
      },
      {
         id: "p3",
         userId: "u3",
         username: "lindsay",

         title: "Recreation of Anne Hathaway's Outfit in Princess Diaries 2",
         description:
            "I've really been into Anne Hathaway's outfits in the second movie. She appears more grown and elegant, so I decided to recreate it! The top is vintage and blah blah.",
         periodTag: "2000s",
         genreTags: ["Romance", "Drama"],
         commentCount: 4,
      },
   ];
   return <PostList posts={posts} />;
}

export default PostsPage;
