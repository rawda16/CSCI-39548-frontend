import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
   TextField,
   Button,
   Select,
   MenuItem,
   FormControl,
   InputLabel,
   FormHelperText,
   Typography,
   Stack,
} from "@mui/material";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostFormSchema = Yup.object({
   title: Yup.string().trim().required("Title is required"),
   content: Yup.string().trim().required("Content is required"),
   timePeriod: Yup.string().required("Time period is required"),
   genre: Yup.array()
      .min(1, "Select at least one genre")
      .required("Genre is required"),
   movie: Yup.string().trim().required("Movie is required"),
});

function PostForm() {
   const [image, setImage] = useState(null);
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

   const handleSubmit = async (values, { resetForm }) => {
      if (!image) {
         alert("Please upload an image.");
         return;
      }

      try {
         const image_url = await uploadImage(image[0]); // uploading image to get url
         const data = {
            ...values,
            image_url,
         };

         // sending post request to upload data
         const response = await api.post("/post", data);

         console.log("Post submitted successfully:", response.data);
         alert("Post submitted successfully!");

         // reseting form
         resetForm();
         setImage(null);

         // navigate back to home page
         navigate("/feed");
      } catch (error) {
         if (error.message === "Image size exceeds 5MB limit") {
            alert(error.message);
         } else {
            alert("Error submitting post.");
         }
         console.error("Error submitting post:", error);
      }
   };

   /* uploading images to cloudinary
    changed from back to front since it is simpler and
    creates less issues since images aren't being redirected
    multiple times before uploading 
   */
   const uploadImage = async (image) => {
      // in future, add signed uploads
      const CLOUD_NAME = "dqmfnu7i7"; // name of cloudinary API
      const formData = new FormData();

      formData.append("file", image);

      /* upload preset lets you choose settings when uploading,
      such as allowing unsigned uploads and uploading to a specific folder */
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
         throw new Error("Failed to upload image");
      }
   };

   return (
      <div>
         <Typography>Submit a Post!</Typography>

         <Formik
            initialValues={{
               title: "",
               content: "",
               timePeriod: "",
               genre: [],
               movie: "",
            }}
            validationSchema={PostFormSchema}
            onSubmit={handleSubmit}
         >
            {({ errors, touched, values, setFieldValue }) => (
               <Form>
                  <Stack gap={1} sx={{}}>
                     <Field
                        as={TextField}
                        name='title'
                        label='Title'
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                     />
                  </Stack>

                  <Stack gap={1} sx={{}}>
                     <Field
                        as={TextField}
                        name='content'
                        label='Content'
                        multiline
                        rows={4}
                        error={touched.content && Boolean(errors.content)}
                        helperText={touched.content && errors.content}
                     />
                  </Stack>

                  <Stack gap={1} sx={{}}>
                     <FormControl
                        error={touched.timePeriod && Boolean(errors.timePeriod)}
                     >
                        <InputLabel>Time Period</InputLabel>
                        <Field
                           as={Select}
                           name='timePeriod'
                           label='Time Period'
                        >
                           <MenuItem value='' disabled>
                              Select a time period
                           </MenuItem>
                           {time_period_list.map((period) => (
                              <MenuItem key={period} value={period}>
                                 {period}
                              </MenuItem>
                           ))}
                        </Field>
                        {touched.timePeriod && errors.timePeriod && (
                           <FormHelperText>{errors.timePeriod}</FormHelperText>
                        )}
                     </FormControl>

                     <FormControl
                        error={touched.genre && Boolean(errors.genre)}
                     >
                        <InputLabel>Genre</InputLabel>
                        <Field
                           as={Select}
                           name='genre'
                           label='Genre'
                           multiple
                           value={values.genre}
                           onChange={(e) =>
                              setFieldValue("genre", e.target.value)
                           }
                        >
                           {movie_genre_list.map((genre) => (
                              <MenuItem key={genre} value={genre}>
                                 {genre}
                              </MenuItem>
                           ))}
                        </Field>
                        {touched.genre && errors.genre && (
                           <FormHelperText>{errors.genre}</FormHelperText>
                        )}
                     </FormControl>

                     <Field
                        as={TextField}
                        name='movie'
                        label='Movie'
                        error={touched.movie && Boolean(errors.movie)}
                        helperText={touched.movie && errors.movie}
                     />
                  </Stack>

                  <Stack gap={1} sx={{}}>
                     <FormControl>
                        <InputLabel shrink>Image *</InputLabel>
                        <input
                           type='file'
                           accept='image/*'
                           onChange={(e) => setImage(e.target.files)}
                           required
                        />
                     </FormControl>
                  </Stack>

                  <Button type='submit' variant='contained'>
                     Submit
                  </Button>
               </Form>
            )}
         </Formik>
      </div>
   );
}

export default PostForm;
