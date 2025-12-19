import { useState } from "react";
import api from "..//axiosConfig";
import { useNavigate } from "react-router-dom";

function EditPost({ post, id, onEdit }) {
   console.log("Editing post:", post);
   const [newTitle, setTitle] = useState(post.title);
   const [newContent, setContent] = useState(post.content);
   const [newTimePeriod, setTimePeriod] = useState(post.timePeriod);
   const [newGenre, setGenre] = useState(post.genre);
   const [newMovie, setMovie] = useState(post.movie);
   const [newImageUrl, setImageUrl] = useState(post.image_url);
   const [newImage, setImage] = useState(null);

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

   const handleSubmit = async (e) => {
      e.preventDefault();

      onEdit(
         id,
         newTitle,
         newContent,
         newTimePeriod,
         newGenre,
         newMovie,
         newImage
      );
   };

   const handleGenreChange = (e) => {
      // since genre is a multi-select, we need to get the selected options and put them in an array
      const selectedOptions = Array.from(e.target.selectedOptions).map(
         (option) => option.value
      );
      setGenre(selectedOptions);
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <div>
               <label htmlFor='title'>
                  <span>Title</span>
               </label>
               <input
                  id='title'
                  type='text'
                  value={newTitle}
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
                  value={newContent}
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
                  value={newTimePeriod}
                  onChange={(e) => {
                     setTimePeriod(e.target.value);
                  }}
                  required
               >
                  <option value='' disabled>
                     Select a time period
                  </option>
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
                  value={newGenre}
                  onChange={handleGenreChange}
                  required
                  multiple
               >
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
                  value={newMovie}
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
                  accept='image/*'
                  onChange={(e) => setImage(e.target.files)}
               />
            </div>

            <button type='submit'>Submit</button>
         </form>
      </div>
   );
}

export default EditPost;
