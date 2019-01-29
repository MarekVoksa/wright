const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const ArticleSchema = mongoose.Schema( {

  title: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  okays: [ { type: Schema.Types.ObjectId, ref: 'User' } ]

}, {

  timestamps: true

});

module.exports = mongoose.model( 'Article', ArticleSchema );
