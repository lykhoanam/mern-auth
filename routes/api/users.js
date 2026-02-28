const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/user');
const {check, validationResult} = require("express-validator");


// @route           GET api/users
// @description     test route
// @access          Public
router.get('/', (req, res) => res.send("User route"));

// @route           POST api/users
// @description     register user
// @access          Public
router.post('/',
    [
        check('name','Name is required').not().isEmpty(),
        check('email', 'Valid email address is required').isEmail(),
        check('password', 'Password must have at least 4 characters').isLength({min: 4})
    ],

    async(req, res) => {
        console.log(req.body);
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {name, email, password} = req.body;
        try{
            let user = await User.findOne({email});
            if(user){
                return res.status(400).json({errors: [{msg: "user already exists"}]})
            }
            user = new User({
                name,
                email,
                password,
            });
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            //sign the token pass in payload, pass in secret, expiration(optional)
            //inside the callback, if we dont get an error we send back the token
            const payload = {
                user: {
                    id: user.id,
                }
            }
            jwt.sign(payload, process.env.jwtSecret, {expiresIn: 720000}, (err, token) => {
                if(err) throw err;
                res.json({token});
            })

        }catch(error){
            console.log(error.message);
            res.status(500).send("Server error");
        }   
    }
);

module.exports = router;