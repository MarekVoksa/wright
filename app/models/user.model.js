const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcryptjs' );

const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema( {

  name: String,
  login: String,
  password: String,
  articles: [ { type: Schema.Types.ObjectId, ref: 'Article' } ]

}, {

  timestamps: true

});

module.exports = mongoose.model( 'User', UserSchema );
