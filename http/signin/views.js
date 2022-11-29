const models = require(require('path').resolve('./') + '/models');
 
exports.signin = async (req, res, next) => {

    res.render('sign/signin');
  
  }

exports.sign = async ( req, res, next) => {
    // Capture the input fields
    let email = req.body.email;
    let password = req.body.password;
    // Ensure the input fields exists and are not empty
    if (email && password) {
      // Execute SQL query that'll select the account from the database based on the specified email and password
      connection.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          req.session.loggedin = true;
          req.session.email = email;
          // Redirect to home page
          response.redirect('/home');
        } else {
          response.send('Incorrect email and/or Password!');
        }			
        response.end();
      });
    } else {
      response.send('Please enter email and Password!');
      response.end();
    }
  }

exports.home = async ( req, res, next) => {
    // If the user is loggedin
	if (req.session.loggedin) {
		// Output email
		response.send('Welcome back, ' + req.session.email + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
  }