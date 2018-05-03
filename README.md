# aMAZEingGames
Welcome to aMAZEingGames! This is our semester project for CSCI 3308: Software Development Methods and Tools.

The purpose of this project is to create a fun and easy to navigate website that enertains user with a variety of games. The website will track a user's highscores, display these scores on the user's profile, and will track overall highscores across all users.

Group Members: 
- Chelsea Buchler
- Justin Velvick
- Vladimir Zhdanov
- Parker Eischen
- Adam Casey
- Sol Pazos


## To run the project:

List of npm installs that are needed (Make sure you are in the `/Project/Login/` directory before proceeding):
* `sudo apt-get install wireless-tools`
* `sudo apt-get install nodejs`
These `webpack` install commands will create a `node_modules` folder inside of your Login directory
* `npm install nodemon`
* `npm install body-parser -save`
* `npm install cookie-parser -save`
* `npm install ejs -save`
* `npm install express -save`
* `npm install express-flash -save`
* `npm install express-myconnection -save`
* `npm install express-session -save`
* `npm install express-validator -save`
* `npm install method-override -save`
* `npm install mysql -save`
* `npm install webpack`
* `npm install webpack-cli -D`
* `npm install --save-dev webpack`
* `npm install bcrypt --save`
* `npm install express-validator --save`
* `npm install express-session`
* `npm i passport-strategy`
* `npm install express-mysql-session --save`
* `npm install passport-local`

**Connect to your database using a socket file system**  
You need to include your **socket path** inside of your **db.js** file so that you can connect to your MySQL database. To find the path, open up a terminal window and type in the following command:  
 `netstat -ln | grep mysql`  

When I run this command, my terminal windows prints this:  
 `unix  2      [ ACC ]     STREAM     LISTENING     22381    /var/run/mysqld/mysqld.sock`  
That last part, `/var/run/mysqld/mysqld.sock` is what you need to add to your **db.js** file, like so:  
```javascript
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
  socketPath: '/var/run/mysqld/mysqld.sock'
})
```
Make sure you create a **.env** file that is in the same directory as the **.env.default** (or edit the **.env.default** file but just make sure to rename it to **.env**). I left it out of this repo because it holds your database password. The **.env** file should look something similar to this:  
```
NODE_ENV=DEVELOPMENT

DB_HOST=local
DB_USER=root
DB_PASSWORD=your_DB_password
DB_NAME=your_DB_name
```

**To run everything:**
1. cd to `/Project/Login` directory
2. connect to the MySQL db with this command:  
   `mysql -u root -p` *You will need to enter your password*. If you haven't already, you will need to create the necessary databases. To do this, follow the instructions in the `/Project/Login/createMySQLTables.txt/` file
3. open 3 different terminal tabs
4. connect to **nodemon** with this command:  
   `nodemon` *This shouldn't throw any errors*
5. start up **webpack** with this command:    
   `./node_modules/.bin/webpack` *This also shouldn't throw any errors*
6. If everything is working, a new tab will open in your browser to display the page.


Note: Tutorial for new-user registration and authentication comes from [these videos](https://www.youtube.com/watch?v=gYjHDMPrkWU&list=PLpPnRKq7eNW3Qm2OfoJ3Hyvf-36TulLDp) by Chris Courses