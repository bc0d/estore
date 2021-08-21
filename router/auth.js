//authentications
const express = require('express');
const session = require('express-session');
const router = express.Router();

const connection = require('../dbconnect');

//signin
router.get('/signin', function(req, res) {
    res.render('signin');
});
router.post('/signin', function(req, res) {
    let fname = req.body.fname;
    let sname = req.body.sname;
    let mail = req.body.mail;
    let pass = req.body.password;
    let data = {
        f_name : fname,
        s_name : sname,
        email : mail,
        pass : pass
    };
    connection.query('INSERT INTO user SET ?', data, function(err, result) {
        if(err) throw err;
        res.redirect('/login');
    });
});

//login
router.get('/login', function(req, res) {
    let loggedin = req.session.loggedin;
    res.render('login', {
        loggedin : loggedin
    });
});
router.post('/login', function(req, res) {
    let mail = req.body.email;
    let pass = req.body.password;
    console.log(mail,pass);
    if(mail&&pass) {
        connection.query("SELECT * FROM user WHERE email = ? AND pass = ?", [mail, pass], function(err, result, fields) {
            if (result.length > 0) {
                console.log(result);
                req.session.loggedin = true;
                req.session.userId = result[0].user_id;
                res.redirect('/');
            }
            else {
                res.send('loggin denied');
            }
            res.end();
            
        });

    }
    else {
        response.send('enter mail and password');
        response.end();
    }
    
});

//logout
router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
})


module.exports = router;