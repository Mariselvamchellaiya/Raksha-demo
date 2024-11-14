// // src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // React Router hook for navigation
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const handleLogin = async (e) => {
    e.preventDefault();
    // navigate("/dashboard");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        { username, password }, // Sending JSON data with username and password
        { headers: { "Content-Type": "application/json" } } // Make sure the header is set to application/json
      );

      // If login is successful, navigate to Dashboard
      console.log(response.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      setError(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // React Router hook for navigation

//   const handleLogin = async () => {
//     // Prepare login request data
//     navigate("/dashboard");
//     // const loginData = { username, password };

//     // try {
//     //   // Send login request to backend API
//     //   const response = await fetch("http://localhost:8000/login", {
//     //     method: "POST",
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //     },
//     //     body: JSON.stringify(loginData),
//     //   });

//     //   if (!response.ok) {
//     //     const data = await response.json();
//     //     throw new Error(data.detail || "Login failed");
//     //   }

//     //   // Handle successful login
//     //   const data = await response.json();
//     //   console.log("Login successful", data);
//     //   // Redirect to dashboard or handle post-login logic here
//     // } catch (error) {
//     //   setError(error.message);
//     // }
//   };

//   return (
//     <div className="bg-white p-8 rounded shadow-md w-96">
//       <h2 className="text-2xl font-semibold mb-4">Login</h2>
//       {error && <div className="text-red-600 mb-4">{error}</div>}

//       <div className="mb-4">
//         <label
//           htmlFor="username"
//           className="block text-sm font-semibold text-gray-700"
//         >
//           Username
//         </label>
//         <input
//           type="text"
//           id="username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded mt-2"
//           required
//         />
//       </div>

//       <div className="mb-6">
//         <label
//           htmlFor="password"
//           className="block text-sm font-semibold text-gray-700"
//         >
//           Password
//         </label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded mt-2"
//           required
//         />
//       </div>

//       <button
//         onClick={handleLogin}
//         className="w-full py-2 bg-blue-600 text-white rounded"
//       >
//         Login
//       </button>
//     </div>
//   );
// };

// export default LoginPage;
