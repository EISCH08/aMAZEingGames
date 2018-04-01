
Tutorial for new-user registration and authentication comes from [these videos by Chris Courses](https://www.youtube.com/watch?v=gYjHDMPrkWU&list=PLpPnRKq7eNW3Qm2OfoJ3Hyvf-36TulLDp)

Ongoing list of npm installs that were needed (MAKE SURE YOU ARE IN PROJECT DIRECTORY):
* `sudo apt-get update`
* `sudo apt-get install wireless-tools`
* `sudo apt-get install nodejs`
* `sudo chmod -R 777/usr/lib/nodejs`
These `webpack` install commands *should* create a `node_modules` folder inside of your project directory
* `npm install webpack`
* `npm install webpack-cli -D`
* `npm install --save-dev webpack`
* `npm install bcrypt --save`
* `npm install express-validator --save`
* `npm install express-session`
* `npm i passport-strategy`
* `npm install express-mysql-session --save`
* `npm install passport-local` [npm install page](https://www.npmjs.com/package/passport-local)

**Connect to your database using a socket file system**  
You need to include your **socket path** inside of your **db.js** file so that you can connect to your MyQL database. To find the path, open up a terminal window and type in the following command:  
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
Make sure you create a **.env** file inside of your **views** directory. I left it out of this repo because it holds your database password. The **.env** file should look something similar to this:  
```
NODE_ENV=DEVELOPMENT

DB_HOST=local
DB_USER=root
DB_PASSWORD=your_DB_password
DB_NAME=your_DB_name
```

**To run everything:**
1. cd to project directory
2. open 3 different terminal tabs/windows (your choice)
3. connect to **nodemon** with this command:  
   `user:~/path/to/project$ nodemon` *This shouldn't throw any errors*
4. start up **webpack** with this command:    
   `user:~/path/to/project$ ./node_modules/.bin/webpack` *This also shouldn't throw any errors*
5. connect to the MySQL db with this command:  
   `user:~/path/to/project$ mysql -u root -p` *You will need to enter your password*
6. If everything is working, a new tab will open in your browser to display the page(s)
