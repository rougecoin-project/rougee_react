import FormData from 'form-data';

const rougeeApiBaseUrl = "https://rougee.io/api/";

const endpoints = {
    createAccount: "create-account",
    getUserData: "get-user-data",
    profileUpdate: "update-user-data",
    loginPage: "auth",
    promotedPost: "get-promoted-post",
    posts: "posts"

};

// ... other imports and functions ...

const SERVER_KEY = "55f12885e31123142b34db242d072af8";  // Define the server key as a constant

async function makeApiRequest(endpoint, requestData, onTokenInvalid) {
    try {
        const accessToken = localStorage.getItem('access_token'); // Retrieve the access token from local storage
        const apiUrl = `${rougeeApiBaseUrl}${endpoint}?access_token=${accessToken}`;

        const formData = new FormData();

        formData.append('server_key', SERVER_KEY);  // Always append the server key

        // Append other form fields from requestData
        for (const key in requestData) {
            if (Object.hasOwnProperty.call(requestData, key)) {
                formData.append(key, requestData[key]);
            }
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.api_status === 401) {
            localStorage.removeItem('access_token');  // Remove the invalid token
            onTokenInvalid && onTokenInvalid();  // Callback to handle token invalidation
            throw new Error('Token is invalid or expired.');
        }

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        return data;

    } catch (error) {
        console.error("API request error:", error);
        throw error;
    }
}

export { makeApiRequest, endpoints, rougeeApiBaseUrl };  // Exporting the base URL as well
