import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Set up __dirname since it's not available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set up the view engine to use EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// In-memory array to store blog posts
let posts = [];

// Route for the home page
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// Route to handle new post submissions
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  
  // Basic validation
  if (title && content) {
    // Add the new post to the posts array
    posts.push({ title, content });
  }
  
  // Redirect back to the home page after submission
  res.redirect('/');
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ... existing code ...

// Route to handle editing a post
app.get('/posts/edit/:index', (req, res) => {
    const index = req.params.index;
    const post = posts[index];
    
    // Render the edit form with the existing post data
    res.render('edit', { post, index });
  });
  
  // Route to handle updating a post
  app.post('/posts/edit/:index', (req, res) => {
    const index = req.params.index;
    const { title, content } = req.body;
  
    // Update the post if title and content are provided
    if (title && content) {
      posts[index] = { title, content };
    }
    
    // Redirect back to the home page after updating
    res.redirect('/');
  });
  
  // Route to handle deleting a post
  app.post('/posts/delete/:index', (req, res) => {
    const index = req.params.index;
  
    // Remove the post from the array
    posts.splice(index, 1);
    
    // Redirect back to the home page after deletion
    res.redirect('/');
  });
  
  // ... existing code ...
  