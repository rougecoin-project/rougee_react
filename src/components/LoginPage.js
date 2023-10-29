import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeApiRequest, endpoints } from '../api';
import { Link } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const endpoint = endpoints.loginPage;
    const requestData = formData;

    // Before making the API request, check for existing token
    const existingToken = localStorage.getItem('access_token');

    if (existingToken) {
      // If a token is found, you can choose to navigate the user to the feed page
      navigate('/feed');
      return; // Return early to prevent further execution
    }

    makeApiRequest(endpoint, requestData)
      .then((data) => {
        if (data.api_status === 200) {
          // Successfully logged in
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('user_id', data.user_id);
          navigate(`/feed`);
        } else {
          // Handle specific login errors based on the API response
          if (data.api_status === 401) {
            setResponse("Incorrect username or password.");
          } else if (data.api_status === 403) {
            setResponse("Access denied. Please check your credentials.");
          } else {
            setResponse("Error logging in.");
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setResponse("Network or server error.");
      });
  };

  // Function to navigate to the create account page
  const navigateToCreateAccount = () => {
    navigate('/createaccount');
  };

  return (
    <div className="login-card">
      <form onSubmit={handleLogin}>
        <h2 className="left">Log In</h2>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required autoComplete="username" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required autoComplete="current-password" />
        <button type="submit">Log In</button>
        <p>Dont have an account?</p>
        <Link to="/createaccount" onClick={navigateToCreateAccount}>Sign Up</Link>
      </form>
      <div>{response}</div>
    </div>
  );
}

export default LoginPage;
