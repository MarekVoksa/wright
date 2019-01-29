module.exports = ( app ) => {

  const register = require( '../controllers/register.controller.js' );

  app.post( '/api/register', register.create );

}
