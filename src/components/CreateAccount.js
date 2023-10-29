import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeApiRequest } from '../api'; // Update the path as needed

function CreateAccount() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirm_password: '',
        email: '',
    });
    const [response, setResponse] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const endpoint = 'create-account'; // Define the API endpoint
        const requestData = formData; // Use the formData as the request data

        makeApiRequest(endpoint, requestData)
            .then((data) => {
                if (data.api_status === 200) {
                    setResponse("User created successfully!");
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('user_id', data.user_id);

                    // Redirect to the /feed route
                    navigate('/profileupdate');
                } else {
                    setResponse("Error creating user.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };




    return (
        <div>
            <div className="login-card">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} required autoComplete="username" />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required autoComplete="new-password" />
                    <input type="password" name="confirm_password" placeholder="Confirm Password" onChange={handleChange} required autoComplete="new-password" />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <button type="submit">Create Account</button>
                </form>
                <div>{response}</div>
            </div>
        </div>
    );
}

export default CreateAccount;
