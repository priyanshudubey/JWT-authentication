const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/',(req, res)=>{
	res.json({
		message: 'welcome'
	});
});

//verifyToken
function verifyToken(req, res, next){
	//Get the auth header value
	const header = req.headers['authorization'];
	if(typeof header !== 'undefined'){
		const bearer = header.split(' ');
		//get token
		const bearerToken = bearer[1];
		//set the token
		req.token = bearerToken;
		//next middleware
		next();

	}else {
		res.sendStatus(403);
	}
}

app.post('/signup', verifyToken ,(req, res) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if(err){
			res.sendStatus(403);
		}
		else{
			res.json({
				message : 'Signup done here',
				authData
			});
		}
	});
});

app.post('/login', (req, res) => {
	const user = {
		id:1,
		username: 'dubey',
		email: 'priyanshu0dubey@gmail.com'
	}
	jwt.sign({user}, 'secretkey', {expiresIn: '6h'} ,(err, token)=>{
		res.json({
			token
		});
	});
});

app.listen(5000, () => console.log('Server is running on 5000'));