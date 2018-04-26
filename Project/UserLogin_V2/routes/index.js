var express = require('express');
var router = express.Router();

var expressValidator = require('express-validator');
var passport = require('passport');

/* Implementing password hashing with bcrypt */
var bcrypt = require('bcrypt');
/* 
saltRounds is the number of hashings the password will go through
salting is a randomly generated string of characters generated for each time a user is inserted
into our db
 */
const saltRounds = 10;


/* GET home page. */
router.get('/', function(req, res, next) {

	const db = require('../db.js');
	var sql = "SELECT * FROM HighScores INNER JOIN users ON users.UserID = HighScores.UserID ORDER BY Snake DESC";
	db.query (sql, function(err,result)
		{
			if(err) throw err;
			console.log(result);
			if (result[2]!=null) {
				user1 = result[0].Username;
			user1 = user1.toUpperCase();
			user2 = result[1].Username;
			user2 = user2.toUpperCase();
			user3 = result[2].Username;
			user3 = user3.toUpperCase();

			score1 = result[0].Snake;
			score2 = result[1].Snake;
			score3 = result[2].Snake;

			res.render('home', { title: 'aMAZEing Games Home Page',user1:  user1, user2:user2, user3:user3 ,score1: score1, 
				score2: score2, score3, score3});
			}
			else if (result[1]!=null && result[2] == null) {
			user1 = result[0].Username;
			user1 = user1.toUpperCase();
			user2 = result[1].Username;
			user2 = user2.toUpperCase();
			user3 = 'NaN';

			score1 = result[0].Snake;
			score2 = result[1].Snake;
			score3 = 0;

			res.render('home', { title: 'aMAZEing Games Home Page',user1:  user1, user2:user2, user3:user3 ,score1: score1, 
				score2: score2, score3, score3});
			}
			else if(result[0]!=null && result[1]==null ){
			user1 = result[0].Username;
			user1 = user1.toUpperCase();
			user2 = 'NaN';
			user3 = 'NaN';

			score1 = result[0].Snake;
			score2 = 0;
			score3 = 0;

			res.render('home', { title: 'aMAZEing Games Home Page',user1:  user1, user2:user2, user3:user3 ,score1: score1, 
				score2: score2, score3, score3});
			}
			else{
			user1 = 'NaN';
			user2 = 'NaN';
			user3 = 'NaN';

			score1 = 0;
			score2 = 0;
			score3 = 0;

			res.render('home', { title: 'aMAZEing Games Home Page',user1:  user1, user2:user2, user3:user3 ,score1: score1, 
				score2: score2, score3, score3});
		}



			
			
			
		});
  
});

//Get the score for the SNAKE game
//NOT WORKING CURRENTLY


router.get('/profile', function(req, res, next) {

	const db = require('../db.js');
	current_user = req.user.userTag;
	var snakeScore;
	var mazeScore;
	var username;
	
	var sql = "SELECT * FROM HighScores INNER JOIN users ON users.UserID = HighScores.UserID WHERE HighScores.UserID = '"+current_user+"' " ;
	db.query (sql, function(err,result)
		{
			if(err) throw err;
			console.log(result[0]);
			snakeScore = result[0].Snake;
			mazeScore = result[0].Maze;
			username = result[0].Username;
			spaceInvadersScore = result[0].SpaceInvaders;
			res.render('profile', { output1: snakeScore, output2: mazeScore,output3: spaceInvadersScore, username: username});
			
		});
	
});
	
  

/*This was added to store a score after someone plays the game   */
router.post('/save-score/Snake', function(req, res, next) {
	//gets the user id --> print out to make sure maybe?
	current_user = req.user.userTag;
	console.log(typeof current_user);
	//gets the score the user just submitted after playing the game
	var current_score = parseInt(req.body.id);
	if(req.isAuthenticated()){
		
		console.log('User is: ', current_user);
		// DB CALL to insert the score (current_score) into a database
		//can change this code to work for any of the games you want to add
		const db = require('../db.js');
		var sql = "UPDATE HighScores SET Snake =" + current_score +" WHERE UserID = '"+current_user+"' AND Snake < " + current_score + "" ;
		db.query (sql, function(err,result)
		{
			if(err) throw err;
			console.log("score added");
		});
	}
  res.redirect('/');
});


router.post('/save-score/maze', function(req, res, next) {
	//gets the user id --> print out to make sure maybe?
	current_user = req.user.userTag;
	console.log(typeof current_user);
	//gets the score the user just submitted after playing the game
	var current_score = parseInt(req.body.id);
	if(req.isAuthenticated()){
		console.log(current_score);
		console.log('User is: ', current_user);
		// DB CALL to insert the score (current_score) into a database
		//can change this code to work for any of the games you want to add
		const db = require('../db.js');
		var sql = "UPDATE HighScores SET Maze =" + current_score +" WHERE UserID = '"+current_user+"' AND Maze > " + current_score + "" ;
		db.query (sql, function(err,result)
		{
			if(err) throw err;
			console.log("score added");
		});
	}
  res.redirect('/');
});




router.get('/register', function(req, res, next) {
  res.render('register', { title: 'aMAZEing Games Registration' });
});

/* 
GET User Profile Page 
When the user gets a url called 'profile' --> call the following funciton
authenticationMiddleware() tests for use login authentication and restricts the profile page if not true
*/

/*
GET Games Page
Going to try and copy the same post action when someone has logged in
*/
router.get('/snake', authenticationMiddleware(), function (req, res) {
	//render the games page
	res.render('snake', { title: 'Snake Game' });
});

router.get('/maze', authenticationMiddleware(), function (req, res) {
	//render the games page
	res.render('maze', { title: 'Maze Game' });
});
/*
GET Login Page
When the user gets a url called 'login'
*/
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'aMAZEing Games User Login' });
});

/*
POST request for existing user login
Makes user authentication request using passport
*/

router.post('/login', passport.authenticate('local', {
	//where should user be redirected if they are successfully logged in --> to their profile page 
	successRedirect: '/profile', 
	//if they fail --> redirect them to the login page
	failureRedirect: '/error'
})); 

router.get('/error', (req,res) => res.send("Error logging in"));

/*
GET Logout Page
When the user gets a url called 'logout' --> logout user with passport logot()
*/
router.get('/logout', function(req, res) {
  req.logout();
  //destroy the user session after logout
  req.session.destroy();
  res.redirect('/');
  //res.render('home', { title: 'Log Out of aMAZEing Games' });
});

/* GET Game Page 1 */

/* GET Game Page 2 */


/*
POST request for new user registration
*/

router.post('/register', function(req, res, next) {

	req.checkBody('username', 'Username field cannot be empty.').notEmpty();
	req.checkBody('username', 'Username must be between 4-15 characters long.').len(4,15);
	req.checkBody('email', 'The email entered is invalid, please try again.').isEmail();
	req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4,100);
	//req.checkBody('password', 'Password must be between 8-100 characters long.').len(8,100);
	req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8,100);
	req.checkBody('passwordMatch', 'Passwords do not match. Please try again.').equals(req.body.password);


	const errors = req.validationErrors();

	if (errors) {
		console.log(`errors: ${JSON.stringify(errors)}`);

		res.render('register', {
			title: 'Registration Error',
			errors: errors
		});
	} else {

	const Username = req.body.username;
	const Useremail = req.body.email;
	const Userpassword = req.body.password;
	//var UserID=Math.floor(Math.random()*35793751)
	var UserID = Math.random().toString(36).substring(7);

	/*console.log(Username);
	console.log(Useremail);
	console.log(Userpassword);
	console.log(UserID);*/

	//This is what actually connects us to the db
	const db = require('../db.js')

	/* saltRounds gets added onto the end of the password to make it harder to crack */
	bcrypt.hash(Userpassword, saltRounds, function(err, hash) {
		//Access databse object and call a query on it
		//This should actually insert a new user into the db
  		db.query('INSERT INTO users (UserID, Username, Useremail, Userpassword) VALUES (?, ?, ?, ?)', [UserID, Username, Useremail, hash],
			function(error, results, fields) {
				if (error) throw error;

				// Once a user is loggen in they can access private information using this db query
				// function() is a callback function
				db.query('SELECT LAST_INSERT_ID() as userTag', function(error, results, fields) {
					//should now be getting id associated with user just inserted into db
					//if you get an error --> throw error
					if (error) throw error;

					const userTag = results[0];
					//if not error the take request object (req.) and use login()
					//results should hold userid from the function(error, results, fields)
					console.log(results[0]);
						//if login was successful take response object (res.) and redirect user to root/home page
					res.redirect('/');

					//res.render('register', { title: 'Registration Complete!' });
				});

			})
  		var initScore = 0;
  		var initScoreMaze = 10000;
  		db.query('INSERT INTO HighScores (UserID, Snake, Maze, SpaceInvaders) VALUES (?, ?, ?, ?)', [UserID,initScore,initScoreMaze,initScore],
  			function(error, results, fields) {
  			});
		});
	//res.render('register', { title: 'Registration Complete!' });
	}
});

//serialization --> writing
passport.serializeUser(function(userTag, done) {
  done(null, userTag);
});


//deserialization --> unwriting
passport.deserializeUser(function(userTag, done) {
    done(null, userTag);
});

//call quest response() to test whether or not the user is authenticated
function authenticationMiddleware() {  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
		//only if the user is authenticated 
	    if (req.isAuthenticated()) return next();
	    //if use is NOT authenticated then redirect them to login page

	    res.redirect('/login');
	    
	}
}

module.exports = router;


