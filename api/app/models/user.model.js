const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jwt-simple' );
const secret = require('../config/config.js').jwtSecret;

const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema( {

  name: String,
  login: String,
  password: String,
  articles: [ { type: Schema.Types.ObjectId, ref: 'Article' } ]

}, {

  timestamps: true

});

UserSchema.pre( 'save', function ( next ) {

  if ( ! this.isModified( 'password' ) ) return next();

  let salt = bcrypt.genSaltSync( 10 );
  let hash = bcrypt.hashSync( this.password, salt );

  this.password = hash;

  next();

});

UserSchema.methods.validatePassword = ( password ) => {

  return bcrypt.compareSync( password, this.password );

};

UserSchema.methods.generateJWT = function() {

  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.encode({
    id: this._id,
    name: this.name,
    exp: exp.getTime(),
  }, secret);

};

UserSchema.methods.toAuthJSON = function(){

  return {
    name: this.name,
    login: this.login,
    token: this.generateJWT()
  };

};

module.exports = mongoose.model( 'User', UserSchema );
