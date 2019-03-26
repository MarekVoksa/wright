module.exports = ( app ) => {

  const auth = require( '../controllers/auth.controller.js' );

  app.post( '/api/auth', auth.auth );
  
  app.post( '/api/unauth', auth.unauth );

}
