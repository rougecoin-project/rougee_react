const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3001;

app.use(express.json());

app.use(cors());

// Use the cors middleware to allow requests from localhost:3000
app.use(cors({
    origin: 'http://localhost:3000', // Adjust to your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and credentials
}));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
