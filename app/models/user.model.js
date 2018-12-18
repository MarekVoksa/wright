const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema( {

  _id: Schema.Types.ObjectId,
  name: String,
  articles: [ { type: Schema.Types.ObjectId, ref: 'Article' } ]

}, {

  timestamps: true

});

module.exports = mongoose.model( 'User', UserSchema );
