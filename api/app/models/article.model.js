const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const ComponentSchema = mongoose.Schema( {

  type: String,
  content: String

});

const ArticleSchema = mongoose.Schema( {

  title: String,
  subtitle: String,
  published: Boolean,
  components: [ ComponentSchema ],
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  okays: [ { type: Schema.Types.ObjectId, ref: 'User' } ]

}, {

  timestamps: true

});

module.exports = mongoose.model( 'Article', ArticleSchema );
