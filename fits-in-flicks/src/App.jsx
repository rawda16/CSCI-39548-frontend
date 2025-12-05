import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
//import "./App.css";
import { PostCard, PostList } from "./components";

function App() {
   const posts = [
      {
         id: "p1",
         userId: "u1",
         username: "maida",

         title: "Mean Girls Woo",
         description:
            "Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!",
         periodTag: "2000s",
         genreTag: "Comedy",
         commentCount: 3,
      },
      {
         id: "p2",
         userId: "u2",
         username: "rawda",

         title: "Vamps Are Cool",
         description: "Look at these victorian style fits from Dracula :O",
         periodTag: "2000s",
         genreTag: "Action",
         commentCount: 5,
      },
   ];
   return <PostList posts={posts} />;
}

export default App;
