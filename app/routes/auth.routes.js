module.exports = ( app ) => {

  const auth = require( '../controllers/auth.controller.js' );

  app.post( '/auth/login', auth.login );
  app.post( '/auth/signup', auth.signup );

}
