import React, { useState } from 'react';
import { makeApiRequest } from '../api'; // Update the path as needed

function ProfileUpdate() {
    const [formData, setFormData] = useState({
        gender: '',
        avatar: null, // Store the selected avatar file
        cover: null, // Store the selected cover file
    });
    const [response, setResponse] = useState('');

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        // If the input is a file input (avatar or cover), update the state with the selected file.
        if (type === 'file') {
            setFormData((prevState) => ({
                ...prevState,
                [name]: files[0], // Store the first selected file
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const endpoint = 'update-user-data'; // Define the API endpoint
        const formDataToSend = new FormData();

        // Append all form data to the FormData object
        for (const key in formData) {
            if (Object.hasOwnProperty.call(formData, key)) {
                if (formData[key] !== null) {
                    formDataToSend.append(key, formData[key]);
                }
            }
        }

        makeApiRequest(endpoint, formDataToSend)
            .then((data) => {
                if (data.api_status === 200) {
                    setResponse("Your profile was updated");
                } else {
                    setResponse("Error updating profile");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <h2>Update Your Profile</h2>
            <form onSubmit={handleSubmit}>
                <select name="gender" onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                {/* Include file input fields for avatar and cover */}
                <input type="file" name="avatar" accept="image/*" onChange={handleChange} />
                <input type="file" name="cover" accept="image/*" onChange={handleChange} />

                <button type="submit">Update Profile</button>
            </form>
            <div>{response}</div>
        </div>
    );
}

export default ProfileUpdate;
