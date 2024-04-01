import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');  
});

// Server listening to port 3000 
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port} link: http://localhost:3000/`);  
});

// node SiteJS/index.js 