const User = require( '../models/user.model.js' );

const config = require( '../config/config.js' );

const jwt = require( 'jwt-simple' );
const bcrypt = require( 'bcryptjs' );

// LOGIN

exports.auth = ( req, res ) => {

  let cookie = req.cookies.wrightToken;

  if ( ! cookie ) {

    User.findOne( { 'login': req.body.login }, ( error, user ) => {

      if ( ! error && user !== null) {

        if ( user.validatePassword( req.body.password, user ) ) {

          let token = user.generateJWT( user );

          return res.status( 200 )
            .cookie( 'wrightToken', token )
            .send( { token: token } );

        } else {

          return res.status( 403 )
            .send( { message: "Username or password incorrect." } );

        }

      } else {

        return res.status( 500 )
          .send( { message: "Server error while searching for user." } );

      }

    });

  } else {

    return res.status( 403 )
      .send( { message: "Already authenticated." } );

  }

};

exports.unauth = ( req, res ) => {

  let cookie = req.cookies.wrightToken;

  if ( cookie ) {

    return res.status( 200 )
      .clearCookie( 'wrightToken' )
      .send( { message: "Unauthenticated successfully." } );

  } else {

    return res.status( 403 )
      .send( { message: "Not authenticated." } );

  }

}
