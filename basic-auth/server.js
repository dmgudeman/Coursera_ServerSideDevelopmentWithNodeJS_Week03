/* Created by davidgudeman on 3/17/16.
 */
var express = require('express');

/* morgan is a middleware that supports logging */
var morgan = require('morgan');

var cookieParser = require('cookie-parser');


/***********************************************************************************/

var hostname = 'localhost';
var port = 3000;

/* This creates the express object that is to be used throughout the program */
var app = express();

/*************************************************************************************/
/* This add logging functionality */
app.use(morgan('dev'));

app.use(cookieParser('12345-67890-09876-54321')); // secret key
/**************************************************************************************/
/* Creating a specific middleware called auth. We will insert the code that does basic authentication.
*/
function auth(req, res, next) {
    console.log(req.headers);

    if (!req.signedCookies.user) {
        // collect the req Header that has the username and password.
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
            return;
        }
        var auth = new Buffer(authHeader.split(' ')[1],
            'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];
        if (user == 'admin' && pass == 'password') {
            /* res.cookie([cookie name],[value], [signed]); */
            res.cookie('user', 'admin', { signed: true });
            next(); // authorized
        } else {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    } else {
        if(req.signedCookies.user === 'admin'){
            //console.log(req.signedCookies);
            next();
        } else {
            
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }
}

app.use(auth);


/****************************************************************************************/
/* node supports two variables: __dirname and __filename. These contain the full path to either the directory or
the file respectively. The __dirname + '/public' is telling express that the static file to be provided is in the
current path that express is in and there is a public file that contains the html file that it is looking for.

The __dirname says that regardless where the express folder is. It states that the public folder is in the express
folder.
*/

app.use(express.static(__dirname + '/public'));

/**********************************************************************************************/
//insert a middleware function that handles the Error

app.use(function (err, req, res, next) {
     res.writeHead(err.status || 500, {
            'WWW-Authenticate': 'Basic',
            'Content-Type': 'text/plain'
        });
    res.end(err.message);

});
/**********************************************************************************************/

/* With express you no longer have to call create http server. The app.listen replaces that. The
 app object takes care of registering with the http server.*/
app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});
