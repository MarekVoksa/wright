const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cookieParser = require( 'cookie-parser' );

const config = require( './app/config/config.js' );
const mongoose = require( 'mongoose' );

const app = express();


//app.use( bodyParser.urlencoded( { extended: true } ) );

app.use( bodyParser.json() );

app.use( cookieParser() );

app.use( ( req, res, next ) => {

  res.header("Access-Control-Allow-Origin", "https://voksama.mp.spse-net.cz");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();

});

mongoose.Promise = global.Promise;

mongoose.connect( config.url, { useNewUrlParser: true } )
  .then( () => {

    console.log( "Connected to the database..." );

  })
  .catch( ( err ) => {

    console.log( 'Could not connect to the database. Exiting.', err );

    process.exit();

  });


app.get( '/', ( req, res ) => {

  res.json( { "message": "Welcome to the official Wright api." } );

});


require( './app/routes/article.routes.js' )( app );
require( './app/routes/auth.routes.js' )( app );
require( './app/routes/user.routes.js' )( app );
require( './app/routes/image.routes.js' )( app );


app.listen( process.env.PORT, () => {

    console.log( "Listening on port 3000..." );

})
