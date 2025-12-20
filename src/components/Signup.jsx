// import { useState } from "react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import { TextField, Button } from "@mui/material";
// // import { useNavigate } from "react-router-dom";

// const SignupSchema = Yup.object({
//    displayName: Yup.string().required("Display name is required"),
//    username: Yup.string().required("Username is required"),
//    email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//    password: Yup.string().required("Password is required"),
// });

// function Signup() {
//    const [message, setMessage] = useState("");
//    // let navigate = useNavigate()

//    const handleSubmit = async (values) => {
//       try {
//          const response = await fetch(
//             "http://localhost:8000/api/auth/register",
//             {
//                method: "POST",
//                headers: {
//                   "Content-Type": "application/json",
//                },
//                body: JSON.stringify(values),
//             }
//          );

//          const data = await response.json();
//          setMessage(data.message);

//          // If successful, you could navigate or save token
//          // if (response.ok) {
//          //    navigate("/login");
//          // }
//       } catch (error) {
//          setMessage("Something went wrong");
//       }
//    };

//    return (
//       <div>
//          <h2>Sign Up</h2>

//          <Formik
//             initialValues={{
//                displayName: "",
//                username: "",
//                email: "",
//                password: "",
//             }}
//             validationSchema={SignupSchema}
//             onSubmit={handleSubmit}
//          >
//             {({ errors, touched }) => (
//                <Form>
//                   <Field
//                      as={TextField}
//                      name='displayName'
//                      label='Display Name'
//                      error={touched.displayName && !!errors.displayName}
//                      helperText={touched.displayName && errors.displayName}
//                      fullWidth
//                      margin='normal'
//                   />

//                   <Field
//                      as={TextField}
//                      name='username'
//                      label='Username'
//                      error={touched.username && !!errors.username}
//                      helperText={touched.username && errors.username}
//                      fullWidth
//                      margin='normal'
//                   />

//                   <Field
//                      as={TextField}
//                      name='email'
//                      label='Email'
//                      type='email'
//                      error={touched.email && !!errors.email}
//                      helperText={touched.email && errors.email}
//                      fullWidth
//                      margin='normal'
//                   />

//                   <Field
//                      as={TextField}
//                      name='password'
//                      label='Password'
//                      type='password'
//                      error={touched.password && !!errors.password}
//                      helperText={touched.password && errors.password}
//                      fullWidth
//                      margin='normal'
//                   />

//                   <Button type='submit' variant='contained' fullWidth>
//                      Register
//                   </Button>
//                </Form>
//             )}
//          </Formik>

//          {message && <p>{message}</p>}
//       </div>
//    );
// }

// export default Signup;

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
   const [message, setMessage] = useState("");
   let navigate = useNavigate();

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
               <Field
                  as={TextField}
                  name='displayName'
                  label='Display Name'
                  error={touched.displayName && !!errors.displayName}
                  helperText={touched.displayName && errors.displayName}
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
                  error={touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  fullWidth
               />

               <Button type='submit' variant='contained'>
                  Register
               </Button>
            </Form>
         )}
      </Formik>
   );
}
