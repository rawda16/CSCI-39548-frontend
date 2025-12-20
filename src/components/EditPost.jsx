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
   Paper,
   Box,
   Stack,
   Grid,
} from "@mui/material";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";

// schema for editing post validation (no image validation)
const EditPostSchema = Yup.object({
   title: Yup.string().required("Title is required"),
   content: Yup.string().required("Content is required"),
   timePeriod: Yup.string().required("Time period is required"),
   genre: Yup.array()
      .min(1, "Select at least one genre")
      .required("Genre is required"),
   movie: Yup.string().required("Movie is required"),
});

export default function EditPost({ post, id, onEdit }) {
   /* image is still kept in a state because it is a file input and
    will be processed in the postdetailedpage when onEdit occurs, so we are
    not using formik/yup for it */
   const [newImage, setNewImage] = useState(null);

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

   const handleSubmit = async (values) => {
      onEdit(
         id,
         values.title,
         values.content,
         values.timePeriod,
         values.genre,
         values.movie,
         newImage
      );
   };

   return (
      <Box sx={{ padding: 4, marginTop: 4, maxWidth: 600, margin: "auto" }}>
         <Formik
            initialValues={{
               title: post.title || "",
               content: post.content || "",
               timePeriod: post.timePeriod || "",
               genre: post.genre || [],
               movie: post.movie || "",
            }}
            validationSchema={EditPostSchema}
            onSubmit={handleSubmit}
         >
            {({ errors, touched, values, setFieldValue }) => (
               <Form>
                  <Stack spacing={2}>
                     <Field
                        as={TextField}
                        name='title'
                        label='Title'
                        variant='standard'
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                     />

                     <Box
                        sx={{
                           // backgroundColor: "white",
                           padding: "50px",
                           borderRadius: "16px",
                           border: "1px solid black",
                        }}
                     >
                        <Field
                           as={TextField}
                           name='content'
                           label='Content'
                           fullWidth
                           multiline
                           rows={4}
                           variant='standard'
                           error={touched.content && Boolean(errors.content)}
                           helperText={touched.content && errors.content}
                        />
                     </Box>

                     <Grid container spacing={2}>
                        <Grid size={3}>
                           <FormControl
                              fullWidth
                              variant='standard'
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
                        </Grid>

                        <Grid size={3}>
                           <FormControl
                              fullWidth
                              variant='standard'
                              error={
                                 touched.timePeriod &&
                                 Boolean(errors.timePeriod)
                              }
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
                                 <FormHelperText>
                                    {errors.timePeriod}
                                 </FormHelperText>
                              )}
                           </FormControl>
                        </Grid>

                        <Grid size={3}>
                           <Field
                              as={TextField}
                              name='movie'
                              label='Movie'
                              variant='standard'
                              error={touched.movie && Boolean(errors.movie)}
                              helperText={touched.movie && errors.movie}
                           />
                        </Grid>
                     </Grid>

                     <FormControl>
                        <InputLabel shrink>Image *</InputLabel>
                        <input
                           type='file'
                           accept='image/*'
                           onChange={(e) => setNewImage(e.target.files)}
                           style={{
                              marginTop: 10,
                              marginLeft: 8,
                           }}
                        />
                     </FormControl>

                     <Button type='submit' variant='contained'>
                        Submit
                     </Button>
                  </Stack>
               </Form>
            )}
         </Formik>
      </Box>
   );
}
