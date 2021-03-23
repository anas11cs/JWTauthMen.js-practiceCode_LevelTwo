const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

const posts = [
    {
        username:"Kim",
        title: 'Post 1'
    },
    {
        username:"Jon",
        title: 'Post 2'
    }
]

app.get('/posts', (req, res) =>{
    res.json(posts);
})

app.get('/login', (req,res) =>{
    // Authentication User

})

app.listen(3000);