const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jwt-simple' );
const secret = require('../config/config.js').jwtSecret;

const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema( {

  name: String,
  imageURL: String,
  login: String,
  password: String

}, {

  timestamps: true

});

UserSchema.pre( 'save', function ( next ) {

  if ( ! this.isModified( 'password' ) ) { return next(); }

  let salt = bcrypt.genSaltSync( 10 );
  let hash = bcrypt.hashSync( this.password, salt );

  this.password = hash;

  next();

});

UserSchema.methods.validatePassword = ( password, user ) => {

  return bcrypt.compareSync( password, user.password );

};

UserSchema.methods.generateJWT = ( user ) => {

  var today = new Date();
  var exp = new Date( today );

  exp.setDate( today.getDate() + 60 );

  return jwt.encode( {

    id: user._id,
    name: user.name,
    exp: exp.getTime()

  }, secret );

};

module.exports = mongoose.model( 'User', UserSchema );
