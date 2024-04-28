/*import passport from 'passport';
import {
  Profile,
  Strategy as GoogleStrategy,
  VerifyCallback,
} from 'passport-google-oauth20';*/
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../.env.production' 
          : __dirname + '/../.env.development'
});
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models/index')
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_SECRET_KEY;
const logger = require('../config/winston');

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_REDIRECT_URL,
        profileFields: ['emails']
    },
        function (accessToken, refreshToken, profile, done) {
            console.log("GOOGLE EMAIL es" + profile.emails[0].value)
            db.User.buscarUsuarioXCorreo(profile.emails[0].value, (err, dataUsuario) => {
                if (err) {
                    return done(err, "");
                } else {
                    if (Object.keys(dataUsuario).length === 0) {
                        logger.log('error', 'Usuario no existe en la Base de Datos');
                        return done(null, false)
                    } else {
                        return done(null, profile.emails[0].value)
                    }
                }
            })
            //console.log(profile)
        })
)

passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        console.log("JWT EMAIL es " + jwt_payload.email)
        db.User.buscarUsuarioXCorreo(jwt_payload.email, (err, dataUsuario) => {
            if (err) {
                logger.log('info', err);
                return done(err, false);
            } else {
                if (Object.keys(dataUsuario).length === 0) {
                    logger.log('error', 'Usuario no existe en la Base de Datos');
                    return done(null, false)
                } else {
                    return done(null, jwt_payload.email)
                }

            }
        })
        //console.log(profile)
    })
)
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});