const express = require("express");
const axios = require("axios");
const { connectDB } = require("./db");

const app = express();
app.use(express.json()); 

let db;

// Connect to MongoDB
connectDB().then((database) => {
    db = database;
});
const PORT = 3000;

app.get("/load", async (request, response) => {
    try {
        const { data: users } = await axios.get("https://jsonplaceholder.typicode.com/users");

        for (const user of users) {
            const { data: posts } = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);

            for (const post of posts) {
                const { data: comments } = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
                post.comments = comments; 
            }

            user.posts = posts; // Attach posts to user
            await db.collection("users").insertOne(user);
        }
       
        response.status(200).json({ message: "Data loaded successfully into the database" });
    } catch (error) {
        response.status(500).json({ error: "Failed to fetch and insert data" });
    }
});

  // Delete all users
app.delete('/users', async (request, response) => {
    try {
      await db.collection('users').deleteMany({});
      response.status(204).send();
    } catch (error) {
        response.status(500).json({ error: "Failed to delete users" });
    }
  });
  
  // Delete user by ID
  app.delete('/users/:userId', async (request, response) => {
    try {
      const { userId } = request.params;
      const result = await db.collection('users').deleteOne({ id: parseInt(userId) });
      if (result.deletedCount === 0) return response.status(404).json({ error: 'User not found' });
      response.status(204).send();
    } catch (error) {
        response.status(500).json({ error: "Failed to delete user" });
    }
  });
  
  // Get user by ID
  app.get('/users/:userId', async (request, response) => {
    try {
      const { userId } = request.params;
      const user = await db.collection('users').findOne({ id: parseInt(userId) });
      if (!user) return response.status(404).json({ error: 'User not found' });
      response.status(200).json(user);
    } catch (error) {
      response.status(500).json({ error: 'Failed to retrieve user data' });
    }
  });
  
  // Add a new user
  app.put('/users', async (request, response) => {
    try {
      const newUser = request.body;
      if (!newUser.id || !newUser.name || !newUser.email) {
        return response.status(400).json({ error: "Missing required fields: id, name, and email" });
    }
      const existingUser = await db.collection('users').findOne({ id: newUser.id });
      if (existingUser) return response.status(409).json({ error: 'User already exists' });
      await db.collection('users').insertOne(newUser);
      response.status(201).json({ message: 'User added successfully' });
    } catch (error) {
      response.status(500).json({ error: "Failed to add user" });
    }
  });
  
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));