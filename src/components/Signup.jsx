import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";

// Validation rules
const RegisterSchema = Yup.object({
   displayName: Yup.string().required("Display name is required"),
   username: Yup.string().required("Username is required"),
   email: Yup.string().email("Invalid email").required("Required"),
   password: Yup.string().required("Required"),
   confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
});

export default function RegisterForm() {
   let navigate = useNavigate();
   const [loggedIn, setLoggedIn] = useState(false);

   useEffect(() => {
      userIsLoggedIn();
   }, []);

   // check if the user is logged in to not show login
   async function userIsLoggedIn() {
      setLoggedIn(localStorage.getItem("user"));
   }

   const handleSubmit = async (values) => {
      try {
         const response = await fetch(
            "http://localhost:8000/api/auth/register",
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(values),
            }
         );

         const data = await response.json();
         alert(data.message + ". Please log in.");

         // If successful, you could navigate or save token
         if (response.ok) {
            navigate("/login");
         }
      } catch (error) {
         alert("Something went wrong");
      }
   };
   return (
      <>
         {loggedIn ? (
            <Typography variant='h5' align='center' sx={{ mt: 5 }}>
               You're already logged in!
            </Typography>
         ) : (
            <Paper
               elevation={3}
               sx={{
                  padding: 4,
                  maxWidth: 500,
                  margin: "auto",
                  marginTop: 5,
               }}
            >
               <Typography variant='h4' sx={{ textAlign: "center", mb: 3 }}>
                  Create an Account!
               </Typography>
               <Formik
                  initialValues={{
                     displayName: "",
                     username: "",
                     email: "",
                     password: "",
                     confirmPassword: "",
                  }}
                  validationSchema={RegisterSchema}
                  onSubmit={handleSubmit}
               >
                  {({ errors, touched }) => (
                     <Form>
                        <Stack spacing={2}>
                           <Field
                              as={TextField}
                              name='displayName'
                              label='Display Name'
                              error={
                                 touched.displayName && !!errors.displayName
                              }
                              helperText={
                                 touched.displayName && errors.displayName
                              }
                              fullWidth
                           />

                           <Field
                              as={TextField}
                              name='username'
                              label='Username'
                              error={touched.username && !!errors.username}
                              helperText={touched.username && errors.username}
                              fullWidth
                           />
                           <Field
                              as={TextField}
                              name='email'
                              label='Email'
                              error={touched.email && !!errors.email}
                              helperText={touched.email && errors.email}
                              fullWidth
                           />

                           <Field
                              as={TextField}
                              name='password'
                              label='Password'
                              type='password'
                              error={touched.password && !!errors.password}
                              helperText={touched.password && errors.password}
                              fullWidth
                           />

                           <Field
                              as={TextField}
                              name='confirmPassword'
                              label='Confirm Password'
                              type='password'
                              error={
                                 touched.confirmPassword &&
                                 !!errors.confirmPassword
                              }
                              helperText={
                                 touched.confirmPassword &&
                                 errors.confirmPassword
                              }
                              fullWidth
                           />

                           <Button
                              type='submit'
                              variant='contained'
                              size='large'
                              endIcon={<SendIcon />}
                              sx={{ alignSelf: "center", maxWidth: "200px" }}
                           >
                              Register
                           </Button>
                        </Stack>
                     </Form>
                  )}
               </Formik>
            </Paper>
         )}
      </>
   );
}
