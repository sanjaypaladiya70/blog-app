const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let posts = [];
let currentId = 1;

// Routes
// Get all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Get single post
app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

// Create post
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  
  const newPost = {
    id: currentId++,
    title,
    content,
    createdAt: new Date().toISOString()
  };
  
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Update post
app.put('/api/posts/:id', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  posts[postIndex] = {
    ...posts[postIndex],
    title,
    content,
    updatedAt: new Date().toISOString()
  };

  res.json(posts[postIndex]);
});

// Delete post
app.delete('/api/posts/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 