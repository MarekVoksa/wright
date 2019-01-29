const User = require( '../models/user.model.js' );

const config = require( '../config/config.js' );

const jwt = require( 'jwt-simple' );
const bcrypt = require( 'bcryptjs' );

// LOGIN

exports.auth = ( req, res ) => {

  User.findOne( { login: req.body.login } )
    .then( ( user ) => {

      if ( user.validatePassword( req, body.password ) ) {

        let token = user.generateJWT();

        return res.status( 200 )
          .send( { token } );

      } else {

        return res.status( 403 )
          .send( { message: "Username or password incorrect." } );

      }

    })
    .catch( () => {

      return res.status( 403 )
        .send( { message: "Username or password incorrect." } );

    });

}
