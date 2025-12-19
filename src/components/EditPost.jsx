import { useState } from "react";
import api from "..//axiosConfig";
import { useNavigate } from "react-router-dom";

function EditPost({
   title,
   content,
   timePeriod,
   genre,
   movie,
   image_url,
   id,
   onEdit,
}) {
   const [newTitle, setTitle] = useState(title);
   const [newContent, setContent] = useState(content);
   const [newTimePeriod, setTimePeriod] = useState(timePeriod);
   const [newGenre, setGenre] = useState(genre);
   const [newMovie, setMovie] = useState(movie);
   const [newImageUrl, setImageUrl] = useState(image_url);
   const [newImage, setImage] = useState(null);

   let navigate = useNavigate();

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
         newImageUrl
      );
   };

   const handleGenreChange = (e) => {
      // since genre is a multi-select, we need to get the selected options and put them in an array
      const selectedOptions = Array.from(e.target.selectedOptions).map(
         (option) => option.value
      );
      setGenre(selectedOptions);
   };

   // uploading images to cloudinary
   // changed from back to front since it is simpler and
   // creates less issues since images aren't being redirected
   // multiple times before uploading
   const uploadImage = async (image) => {
      // in future, add signed uploads
      const CLOUD_NAME = "dqmfnu7i7"; // name of cloudinary API
      const formData = new FormData();

      formData.append("file", image);

      // upload preset lets you choose settings when uploading,
      // such as allowing unsigned uploads and uploading to a specific folder
      formData.append("upload_preset", "fits-in-flicks");

      // checking image size to be less than 5MB
      if (image.size > 5242880) {
         throw new Error("Image size exceeds 5MB limit");
      }

      try {
         // upload to cloudinary
         const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            formData
         );
         console.log("Cloudinary response:", response);

         return response.data.secure_url;
      } catch (error) {
         console.error("Error uploading image to Cloudinary:", error);
         throw new Error("Failed to upload image", response.statusText);
      }
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
                  value={genre}
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
