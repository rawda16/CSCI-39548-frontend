import { useState } from "react";

function PostForm() {
   // id         Int       @id @default(autoincrement())
   // createdAt  DateTime  @default(now())
   // EditedAt   DateTime? @default(now())
   // title      String
   // content    String
   // timePeriod String
   // genre      String[]
   // movie      String
   // image_url  String // potential for image url???

   // authorId Int
   // author   User      @relation(fields: [authorId], references: [id])
   // comments Comment[]
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [timePeriod, setTimePeriod] = useState("");
   const [genre, setGenre] = useState("");
   const [movie, setMovie] = useState("");
   const [image, setImage] = useState("");

   const time_period_list = [
      "1920s",
      "1930s",
      "1940s",
      "1950s",
      "1960s",
      "1970s",
      "1980s",
      "1990s",
      "2000s",
      "2010s",
      "2020s",
   ];
   const movie_genre_list = [
      "Action",
      "Romance",
      "Drama",
      "Western",
      "Mystery",
      "Animated",
      "Comedy",
      "Historical",
      "Horror",
      "Sci-fi",
   ];

   const handleSubmit = (e) => {
      e.preventDefault();
   };

   return (
      <div>
         <h2>Submit a Post!</h2>
         <form onSubmit={handleSubmit}>
            <div>
               <label htmlFor='title'>
                  <span>Title</span>
               </label>
               <input
                  id='title'
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
               />
            </div>

            <div>
               <label htmlFor='content'>
                  <span>Content</span>
               </label>
               <textarea
                  id='content'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
               ></textarea>
            </div>

            <div>
               <label htmlFor='timePeriod'>
                  <span>Time Period</span>
               </label>
               <select
                  id='timePeriod'
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                  required
               >
                  <option value=''>Select a time period</option>
                  {time_period_list.map((period) => (
                     <option key={period} value={period}>
                        {period}
                     </option>
                  ))}
               </select>

               <label htmlFor='genre'>
                  <span>Genre</span>
               </label>
               <select
                  id='genre'
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  required
               >
                  <option value=''>Select a genre</option>
                  {movie_genre_list.map((genre) => (
                     <option key={genre} value={genre}>
                        {genre}
                     </option>
                  ))}
               </select>

               <label htmlFor='movie'>
                  <span>Movie</span>
               </label>
               <input
                  id='movie'
                  type='text'
                  value={movie}
                  onChange={(e) => setMovie(e.target.value)}
                  required
               />
            </div>

            <div>
               <label htmlFor='image'>
                  <span>Image</span>
               </label>
               <input
                  id='image'
                  type='file'
                  value={image}
                  accept='image/*'
                  onChange={(e) => setImage(e.target.value)}
               />
            </div>

            <button type='submit'>Submit</button>
         </form>
      </div>
   );
}

export default PostForm;
