import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object({
   email: Yup.string().required("Required"),
   password: Yup.string().required("Required"),
});

export default function LoginForm() {
   const [message, setMessage] = useState("");
   const [loggedIn, setLoggedIn] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      userIsLoggedIn();
   }, []);

   // check if the user is logged in to not show login
   async function userIsLoggedIn() {
      setLoggedIn(localStorage.getItem("user"));
   }

   const handleSubmit = async (values) => {
      try {
         const res = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               email: values.email,
               password: values.password,
            }),
         });

         const data = await res.json();

         if (!res.ok) {
            alert(data.message);
         } else {
            // Save JWT token (slide-based approach)
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", data.user.id);
            alert("Login successful!");
            navigate("/feed");
         }
      } catch (error) {
         alert("Something went wrong");
      }
   };
   return (
      <>
         {loggedIn ? (
            <Typography>You're already logged in!</Typography>
         ) : (
            <Formik
               initialValues={{ email: "", password: "" }}
               validationSchema={LoginSchema}
               onSubmit={handleSubmit}
            >
               {({ errors, touched }) => (
                  <Form>
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

                     <Button type='submit' variant='contained'>
                        Login
                     </Button>
                  </Form>
               )}
            </Formik>
         )}
      </>
   );
}
