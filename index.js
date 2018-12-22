const express = require( 'express' );
const bodyParser = require( 'body-parser' );

const config = require( './config/config.js' );
const mongoose = require( 'mongoose' );

const app = express();


app.use( bodyParser.urlencoded( { extended: true } ) );

app.use( bodyParser.json() );


mongoose.Promise = global.Promise;

mongoose.connect( config.url, { useNewUrlParser: true } ).then( () => {

    console.log( "Connected to the database..." );

}).catch( ( err ) => {

    console.log( 'Could not connect to the database. Exiting.', err );

    process.exit();

});


app.get( '/', ( req, res ) => {

    res.json( { "message": "Welcome to the official Wright api." } );

});


require( './app/routes/article.routes.js' )( app );
require( './app/routes/auth.routes.js' )( app );


app.listen( 3000, () => {

    console.log( "Listening on port 3000..." );

});
