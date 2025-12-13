import { useState } from "react";
import { PostList } from "../components";

function PostsPage() {
   const posts = [
      {
         id: "p1",
         userId: "u1",
         username: "maida",

         title: "Mean Girls Woo",
         image: "https://media.cnn.com/api/v1/images/stellar/prod/140313171146-mean-girls-movie-still.jpg?q=x_145,y_30,h_765,w_1360,c_crop/h_833,w_1480",
         description:
            "Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!Look at this chic outfit from Mean Girls!!",

         periodTag: "2000s",
         genreTags: ["Comedy", "Drama"],

         likeCount: 10,
         commentCount: 3,
      },
      {
         id: "p2",
         userId: "u2",
         username: "rawda",

         title: "Goths Are Cool",
         image: "https://dp9a3tyzxd5qs.cloudfront.net/from-the-archive-the-addams-family-3.jpg",
         description:
            "Look at this vampire victorian style fit from Addams Family! Does anyone know where I could find a similar top? :/",

         periodTag: "1900s",
         genreTags: ["Action", "Horror"],

         likeCount: 14,
         commentCount: 5,
      },
      {
         id: "p3",
         userId: "u3",
         username: "lindsay",

         title: "Recreation of Anne Hathaway's Outfit in Princess Diaries 2",
         image: "https://i.redd.it/hkgaum1m3ss21.jpg",
         description:
            "I've really been into Anne Hathaway's outfits in the second movie. She appears more grown and elegant, so I decided to recreate it! The top is vintage and blah blah.",

         periodTag: "2000s",
         genreTags: ["Romance", "Drama"],

         likeCount: 11,
         commentCount: 4,
      },
   ];
   return <PostList posts={posts} />;
}

export default PostsPage;
