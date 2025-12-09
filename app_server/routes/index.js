console.log('Loading controllers...');
console.log('About controller path:', require.resolve('../controllers/about'));
console.log('Auth controller path:', require.resolve('../controllers/auth'));
console.log('Dessert controller path:', require.resolve('../controllers/dessert'));

const express = require('express');
const router = express.Router();
const passport = require('passport');

const ctrlAbout = require('../controllers/about');
const ctrlAuth = require('../controllers/auth');
const ctrlDesserts = require('../controllers/dessert');

// Middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Please login to view desserts');
    res.redirect('/login');
};

/* Homepage - redirect to login if not authenticated */
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/dessert');
    } else {
        res.redirect('/login');
    }
});

/* About page */
router.get('/about', ctrlAbout.aboutPage);

/* Login page */
router.get('/login', ctrlAuth.login);
router.post('/login', 
    passport.authenticate('local', { 
        successRedirect: '/dessert',
        failureRedirect: '/login',
        failureFlash: true 
    })
);

/* Register page */
router.get('/register', ctrlAuth.register);
router.post('/register', (req, res, next) => {
    const mongoose = require('mongoose');
    const User = mongoose.model('User');
    
    const user = new User({ username: req.body.username });
    
    User.register(user, req.body.password, (err, user) => {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        
        passport.authenticate('local')(req, res, () => {
            res.redirect('/dessert');
        });
    });
});
/* Logout */
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            console.error('Logout error:', err);
            req.flash('error', 'Error logging out');
            return res.redirect('/');
        }
        req.flash('success', 'Logged out successfully');
        res.redirect('/');
    });
});

/* Dessert list page - requires login */
router.get('/dessert', isLoggedIn, ctrlDesserts.dessertList);

/* Dessert details page - requires login */
router.get('/dessert/:id', isLoggedIn, ctrlDesserts.dessertReadOne);

module.exports = router;