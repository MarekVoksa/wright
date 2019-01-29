const User = require( '../models/user.model.js' );

exports.create = ( req, res ) => {

  User.findOne( { login: req.body.login } )
    .then( ( user ) => {

      if ( user === null ) {

        const newUser = new User( {

          name: req.body.name,
          login: req.body.login,
          password: req.body.password,

        });

        newUser.save()
          .then( ( data ) => {

            return res.status( 200 )
              .send( { message: "Successfully registered!" } );

          })
          .catch( ( err ) => {

            res.status( 500 )
              .send( {

                message: err.message || "Error while creating the article."

              });

          });

      } else {

        return res.status( 403 )
          .send( { message: "A user with that username already exists.:" + user.login + " " + user.name } );

      }

    })
    .catch();

}
