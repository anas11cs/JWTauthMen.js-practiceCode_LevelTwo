require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

// 
app.use(express.json());

const posts = [
    {
        username:"Kim",
        title: 'Post 1'
    },
    {
        username:"Annu",
        title: 'Post 2'
    }
]

// Below Contain authenticateToken middleware function
app.get('/posts',authenticateToken, (req, res) =>{
    res.json(posts.filter(post => post.username === req.user.name));
})

app.post('/login', (req,res) =>{

    // Authentication User
    const username = req.body.username;
    const user = {name: username}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    
    res.json({ accessToken: accessToken})
})

// MiddleWare Function
function authenticateToken(req, res ,next){
    // Bearer TOKEN (format is in Header)
    const authHeader = req.headers['authorization'];
    const token = authHeader &&  authHeader.split(' ')[1]; // [1] for 2nd parameter in the array that keyword Bearer before
    if(token == null) return res.sendStatus(401);

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

app.listen(3000);