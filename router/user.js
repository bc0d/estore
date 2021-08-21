//user profile
const express = require('express');
const router = express.Router();

const connection = require('../dbconnect');

//profile
router.get('/profile', function(req, res) {
    let uid = req.session.userId;
    connection.query('SELECT * FROM user WHERE user_id = ?', {uid}, function(err, result) {
        if(err) throw err;
        else {
            res.render('profile', {
                user : result
            });
        }
    });
});

module.exports = router;