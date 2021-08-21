//products pages
const express = require('express');
const router = express.Router();

const connection = require('../dbconnect');

//products
router.get('/products', function(req, res) {
    let loggedin = req.session.loggedin;
    /*
    connection.query('SELECT * FROM product', function(err, result) {
        if (err) {
            return console.error(error.message);
        }
        res.render('single-product', {
            products : result
        });
    });
     */
    res.render('products',  {
        loggedin : loggedin
    });
});

//single product
router.get('/single-product', function(req, res) {
    let loggedin = req.session.loggedin;
    /*
    let pid = req.query.pid; (to get pid need to asign pid with the link)
    connection.query('SELECT * FROM product WHERE prod_id = ?', {pid}, function(err, result) {
        if (err) {
            return console.error(error.message);
        }
        res.render('single-product', {
            details : result
        });
    });
     */
    res.render('single-product',  {
        loggedin : loggedin
    });
});

//cart
router.get('/cart', function(req, res) {
    let loggedin = req.session.loggedin;
    
    /*
    let userid = req.session.userId;
    connection.query('SELECT * FROM cart WHERE user_id = ?', {userid}, function(err, result) {
        if (err) {
            return console.error(error.message);
        }
        res.render('cart', {
            cartlist : result,
            length : result.length
        });
    });
     */
    res.render('cart', {
        loggedin : loggedin
    });
});
/*cart
router.post('/cart', function(req, res) {
    if(req.session.loggedin != true) {
        res.redirect('/login');
    }
    else {
        let userid = req.session.userId;
        connection.query('INSERT INTO cart WHERE ', , function(err, result) {
            if(err) throw err;
            else {
                res.redirect('/cart');
            }
        });
    }
});
*/

module.exports = router;