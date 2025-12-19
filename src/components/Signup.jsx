import { useState } from "react";
// import { useNavigate } from "react-router-dom";

function Signup() {
   // Store form input values
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [displayName, setDisplayName] = useState("");
   const [username, setUsername] = useState("");
   const [message, setMessage] = useState("");
   //  let navigate = useNavigate()

   // Runs when the form is submitted
   const handleSubmit = async (e) => {
      e.preventDefault(); // prevent page refresh

      // Send POST request to backend register endpoint
      const response = await fetch("http://localhost:8000/api/auth/register", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ displayName, username, email, password }),
      });

      const data = await response.json();
      setMessage(data.message);
   };

   return (
      <div>
         <h2>Sign Up</h2>

         <form onSubmit={handleSubmit}>
            <input
               type='text'
               placeholder='Display Name'
               value={displayName}
               onChange={(e) => setDisplayName(e.target.value)}
            />
            <input
               type='text'
               placeholder='Username'
               value={username}
               onChange={(e) => setUsername(e.target.value)}
            />

            <input
               type='email'
               placeholder='Email'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />

            <input
               type='password'
               placeholder='Password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />

            <button type='submit'>Register</button>
         </form>

         <p>{message}</p>
      </div>
   );
}

export default Signup;
